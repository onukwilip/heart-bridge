FROM node:18-alpine

# Set up /app as the directory where the application files will be stored
WORKDIR /app

# Copy the package.json to the working directory
COPY ./package.json .

# Install the node packages
RUN npm install -f

# Install and set up the Infisical software fot managing the application secrets
RUN apk add --no-cache bash curl && curl -1sLf \
    'https://dl.cloudsmith.io/public/infisical/infisical-cli/setup.alpine.sh' | bash \
    && apk add infisical

# Set the public environmental variables for the application
ENV NEXT_PUBLIC_APPWRITE_PROJECT_ID=670ccd9b001312d55bb6
ENV NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_484ebbd34258570644953b572ace3fb9600d2acf

# Copy the entire project to the working directory
COPY . .

# Create the production-ready version of the project
RUN npm run build

# Copy the bash file responsible for starting the image/running the image container to the working directory
COPY ./docker-start.sh .

# Declare the arguments which will be stored as environmental variables, e.g. the infisical project id, and machine client id and secret for connecting to our Infisical project where the app secrets are being stored
ARG INFISICAL_MACHINE_CLIENT_ID_ARG
ARG INFISICAL_MACHINE_CLIENT_SECRET_ARG
ARG PROJECT_ID_ARG

# Declare environmental variables from the passed arguments
ENV INFISICAL_MACHINE_CLIENT_ID=${INFISICAL_MACHINE_CLIENT_ID_ARG}
ENV INFISICAL_MACHINE_CLIENT_SECRET=${INFISICAL_MACHINE_CLIENT_SECRET_ARG}
ENV PROJECT_ID_ENV=${PROJECT_ID_ARG}

RUN export PROJECT_ID=${PROJECT_ID_ENV}

# Make the entrypoint script executable
RUN chmod +x docker-start.sh

# Run the entrypoint script with /bin/sh
CMD ["/bin/sh", "docker-start.sh"]