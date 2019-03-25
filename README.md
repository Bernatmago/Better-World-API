# Better World API

Api designed to be used by the Better Word APP, made by UAB Students.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 
(Pending)See deployment for notes on how to deploy the project on a live system.

### Installing

How to get a development env running.

Install Node.JS LTS version.

```
Download from https://nodejs.org/en/download/
Install using default settings
```

Install MongoDB to use it locally for development purposes.

```
Read instructions depending on your os from: https://docs.mongodb.com/manual/installation/
```

Clone this repository.

```
git clone https://github.com/Bernatmago/Better-World-API.git
```

Go to the local repo directory and install dependencies with node package manager.
```
npm install
```

You Must Define a ```.env``` file on the root directory with the following vars

| Name | Value | 
| ---- | ----- |
| ACCOUNT_SID | Twilio Account SID |
| AUTH_TOKEN | Twilio Auth Token |
| FROM_PHONE | Twilio Phone Number |
| MONGO_PASSWORD | MongoDB Password |
| MONGO_USER | MongoDB User |
| CLOUD_NAME | Cloudinary Cloud Name |
| CLOUD_KEY | Cloudinary Key |
| CLOUD_SECRET | Cloudinary Secret |

### Adding Packages

To add a package use node package manager. Save flag is used to add the package to the package.json dependencies file.
```
npm install --save <package name>
```
