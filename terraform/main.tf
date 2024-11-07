provider "google" {
  project = "impactful-shard-429011-e7"
  region  = "us-central1"
}

# Define a Google Cloud firewall rule allowing access to ports 3*** - 4***
resource "google_compute_firewall" "react-server" {
  name    = "react-server"
  network = "default" # or specify the name of your VPC network

  # Target instances with the 'react-server' tag
  target_tags = ["react-server"]

  # Allow incoming TCP traffic on ports 3000-4000
  allow {
    protocol = "tcp"
    ports    = ["3000-4000"]
  }

  # Set source ranges (e.g., to allow traffic from any IP)
  source_ranges = ["0.0.0.0/0"] # adjust as needed for security purposes
}


# Define a Google Cloud instance template with a startup script
resource "google_compute_instance_template" "heart-bridge-instance" {
  name        = "heart-bridge-instance"
  description = "This template is used to Heart Bridge app server instances."

  instance_description = "The instance where the Heart Bridge application will be deployed to"
  machine_type         = "e2-micro"
  tags                 = ["http-server", "react-server"]

  // Create a new boot disk from an image
  disk {
    source_image = "projects/debian-cloud/global/images/family/debian-12"
    auto_delete  = true
    boot         = true
    disk_type    = "pd-standard"
    disk_size_gb = 10
    device_name  = "heart-bridge-disk"
  }

  network_interface {
    network = "default"

    # External IP configuration
    access_config {
    }
  }

  metadata = {
    startup-script = <<-EOT
#!/bin/bash

# SET-UP DOCKER

for pkg in docker.io docker-doc docker-compose podman-docker containerd runc; do
    sudo apt-get remove $pkg -y 2>&1 | logger
done

# Add Docker's official GPG key:
{
    sudo apt-get update | logger
    sudo apt-get install ca-certificates curl -y | logger
    sudo install -m 0755 -d /etc/apt/keyrings | logger
    sudo curl -fsSL https://download.docker.com/linux/debian/gpg -o /etc/apt/keyrings/docker.asc | logger
    sudo chmod a+r /etc/apt/keyrings/docker.asc | logger

    # Add the repository to Apt sources:
    echo \
      "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/debian \
      $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
      sudo tee /etc/apt/sources.list.d/docker.list > /dev/null | logger
    sudo apt-get update | logger

    sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin -y | logger

    # Uninstall previous images
    sudo docker rmi prince2006/heart-bridge:latest

    # Run the application
    sudo docker run --name heart-bridge -p 3000:3000 --rm -d prince2006/heart-bridge:latest | logger
} 2>&1 | logger

# CONFIGURE NGINX

# Update and install Nginx if not installed
{
    sudo apt update | logger
    sudo apt install -y nginx | logger

    # Write Nginx configuration to route traffic from port 80 to 3000
    sudo bash -c 'cat > /etc/nginx/sites-available/default <<EOF
server {
    listen 80;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF' | logger

    # Test the Nginx configuration to ensure there are no errors
    sudo nginx -t | logger

    # Restart Nginx to apply the configuration
    sudo systemctl restart nginx | logger
} 2>&1 | logger
EOT
  }
}

# Create a Google Cloud HTTP health check for the application
resource "google_compute_health_check" "heart-bridge-health-check" {
  name                = "heart-bridge-health-check"
  check_interval_sec  = 30
  timeout_sec         = 30
  healthy_threshold   = 2
  unhealthy_threshold = 3

  tcp_health_check {
    port         = 80
    proxy_header = "NONE" # This disables the proxy protocol
  }

  # Optional: enable or disable logging
  log_config {
    enable = false
  }
}

# Create a managed instance group with the instance template and health check
resource "google_compute_instance_group_manager" "heart-bridge-instance-group-manager" {
  name = "heart-bridge-instance-group-manager"

  base_instance_name = "heart-bridge-instance"
  zone               = "us-central1-c"
  target_size        = 2

  version {
    instance_template = google_compute_instance_template.heart-bridge-instance.self_link
  }

  named_port {
    name = "http"
    port = 80
  }

  auto_healing_policies {
    health_check      = google_compute_health_check.heart-bridge-health-check.self_link
    initial_delay_sec = 1800
  }
}

# Define an autoscaler for the instance group
resource "google_compute_autoscaler" "heart-bridge-autoscaler" {
  name   = "heart-bridge-autoscaler"
  zone   = "us-central1-c"
  target = google_compute_instance_group_manager.heart-bridge-instance-group-manager.self_link

  autoscaling_policy {
    max_replicas    = 3
    min_replicas    = 2
    cooldown_period = 60

    cpu_utilization {
      target = 0.6
    }
  }
}

# Backend service for the load balancers
resource "google_compute_backend_service" "heart-bridge-backend" {
  name                            = "heart-bridge-backend"
  load_balancing_scheme           = "EXTERNAL_MANAGED" # Sets it to Global External Load Balancer
  protocol                        = "HTTP"             # Matches your manually created backend
  timeout_sec                     = 30                 # Adjust timeout to match the manual backend
  port_name                       = "http"             # Use "http" for the HTTP port configuration
  enable_cdn                      = true
  connection_draining_timeout_sec = 300

  backend {
    group = google_compute_instance_group_manager.heart-bridge-instance-group-manager.instance_group
  }

  health_checks = [google_compute_health_check.heart-bridge-health-check.self_link]

  log_config {
    enable = false # Disables logging; set to true if you want to enable it
  }

  iap {
    enabled = false # Disables IAP by default; adjust as needed
  }
}

# URL map for routing traffic to the backend service
resource "google_compute_url_map" "heart-bridge-url-map" {
  name            = "heart-bridge-url-map"
  default_service = google_compute_backend_service.heart-bridge-backend.self_link
}

# HTTP target proxy to route requests based on the URL map
resource "google_compute_target_http_proxy" "heart-bridge-http-proxy" {
  name    = "heart-bridge-http-proxy"
  url_map = google_compute_url_map.heart-bridge-url-map.self_link
}

# Global forwarding rule for the load balancer frontend without a static IP
resource "google_compute_global_forwarding_rule" "heart-bridge-forwarding-rule" {
  name                  = "heart-bridge-forwarding-rule"
  target                = google_compute_target_http_proxy.heart-bridge-http-proxy.self_link
  port_range            = "80"
  load_balancing_scheme = "EXTERNAL"
}
