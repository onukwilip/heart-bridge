from locust import FastHttpUser, task, constant

class WebUser(FastHttpUser):
    host = "http://devfest.chickenkiller.com"
    wait_time = constant(0)
    @task
    def index(self):
        self.client.get("/")