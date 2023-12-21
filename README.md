# Mail-Service

The email dispatching is facilitated by Resend and our email templates have been implemented using React-Email. This system relies on Express to provide this REST-Service, which provides us with the capacity to send emails to our users efficiently.

## ToC

- [Mail-Service](#mail-service)
  - [ToC](#toc)
  - [Installation](#installation)
    - [Mail-Service](#mail-service-1)
    - [React-Email](#react-email)
  - [Example](#example)

## Installation

### Mail-Service

1. Set environment variables as defined in the `.env.example`
2. Install dependencies

   ```bash
   npm install
   ```

3. Start your application
   ```bash
   npm run dev
   # or run the production build with
   npm start
   ```

### React-Email

> [!NOTE]
> React-Email is only required for the templating process and building our Email-Templates

1. Switch to react-email

   ```bash
   cd ./transactional
   ```

2. Install & Start

   > [!NOTE]
   > If it's the your first start it can take up some time until the react-email tool is setup and installed

   ```bash
   npm install
   # Start React-Email
   npm run dev
   ```

3. Start templating

   You can now start templating by simply creating an `.tsx`-file which contains your defined mail-template in form of an React-Component.

4. Export templates

   > Not neccessary for the current setup

   ```bash
   npm run export
   ```

## Example

How to send an email, by requesting the `/send`-endpoint

```curl
curl -X POST \
  http://localhost:3000/send \
  -H 'Content-Type: application/json' \
  -d '{
    "to": ["example1@example.com"],
    "mail": "welcome",
    "email": "example1@example.com"
    "uuid": "123e4567-e89b-12d3-a456-426614174000"
}'
```
