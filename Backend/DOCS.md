# backend v0.0.0



- [Auth](#auth)
	- [Authenticate](#authenticate)
	- [Authenticate with Facebook](#authenticate-with-facebook)
	- [Authenticate with Github](#authenticate-with-github)
	- [Authenticate with Google](#authenticate-with-google)
	
- [Calendar](#calendar)
	- [Create calendar](#create-calendar)
	- [Delete calendar](#delete-calendar)
	- [Retrieve calendar](#retrieve-calendar)
	- [Retrieve calendars](#retrieve-calendars)
	- [Update calendar](#update-calendar)
	
- [Meetingslot](#meetingslot)
	- [Create meetingslot](#create-meetingslot)
	- [Delete meetingslot](#delete-meetingslot)
	- [Retrieve meetingslot](#retrieve-meetingslot)
	- [Retrieve meetingslots](#retrieve-meetingslots)
	- [Update meetingslot](#update-meetingslot)
	
- [PasswordReset](#passwordreset)
	- [Send email](#send-email)
	- [Submit password](#submit-password)
	- [Verify token](#verify-token)
	
- [Provider](#provider)
	- [Create provider](#create-provider)
	- [Delete provider](#delete-provider)
	- [Retrieve provider](#retrieve-provider)
	- [Retrieve providers](#retrieve-providers)
	- [Update provider](#update-provider)
	
- [Service](#service)
	- [Create service](#create-service)
	- [Delete service](#delete-service)
	- [Retrieve service](#retrieve-service)
	- [Retrieve services](#retrieve-services)
	- [Update service](#update-service)
	
- [User](#user)
	- [Create user](#create-user)
	- [Delete user](#delete-user)
	- [Retrieve current user](#retrieve-current-user)
	- [Retrieve user](#retrieve-user)
	- [Retrieve users](#retrieve-users)
	- [Update password](#update-password)
	- [Update user](#update-user)
	


# Auth

## Authenticate



	POST /auth

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization			| String			|  <p>Basic authorization with email and password.</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Master access_token.</p>							|

## Authenticate with Facebook



	POST /auth/facebook


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Facebook user accessToken.</p>							|

## Authenticate with Github



	POST /auth/github


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Github user accessToken.</p>							|

## Authenticate with Google



	POST /auth/google


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Google user accessToken.</p>							|

# Calendar

## Create calendar



	POST /calendars


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| name			| 			|  <p>Calendar's name.</p>							|
| notes			| 			|  <p>Calendar's notes.</p>							|
| meetingSlots			| 			|  <p>Calendar's meetingSlots.</p>							|

## Delete calendar



	DELETE /calendars/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Retrieve calendar



	GET /calendars/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Retrieve calendars



	GET /calendars


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update calendar



	PUT /calendars/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| name			| 			|  <p>Calendar's name.</p>							|
| notes			| 			|  <p>Calendar's notes.</p>							|
| meetingSlots			| 			|  <p>Calendar's meetingSlots.</p>							|

# Meetingslot

## Create meetingslot



	POST /meetingslots


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| date			| 			|  <p>Meetingslot's date.</p>							|
| adress			| 			|  <p>Meetingslot's adress.</p>							|
| bookingId			| 			|  <p>Meetingslot's bookingId.</p>							|
| status			| 			|  <p>Meetingslot's status.</p>							|
| serviceId			| 			|  <p>Meetingslot's serviceId.</p>							|

## Delete meetingslot



	DELETE /meetingslots/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Retrieve meetingslot



	GET /meetingslots/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Retrieve meetingslots



	GET /meetingslots


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update meetingslot



	PUT /meetingslots/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| date			| 			|  <p>Meetingslot's date.</p>							|
| adress			| 			|  <p>Meetingslot's adress.</p>							|
| bookingId			| 			|  <p>Meetingslot's bookingId.</p>							|
| status			| 			|  <p>Meetingslot's status.</p>							|
| serviceId			| 			|  <p>Meetingslot's serviceId.</p>							|

# PasswordReset

## Send email



	POST /password-resets


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| email			| String			|  <p>Email address to receive the password reset token.</p>							|
| link			| String			|  <p>Link to redirect user.</p>							|

## Submit password



	PUT /password-resets/:token


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| password			| String			|  <p>User's new password.</p>							|

## Verify token



	GET /password-resets/:token


# Provider

## Create provider



	POST /providers


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|
| userId			| 			|  <p>Provider's userId.</p>							|
| serviceIds			| 			|  <p>Provider's serviceIds.</p>							|
| bankAccount			| 			|  <p>Provider's bankAccount.</p>							|
| calendarIds			| 			|  <p>Provider's calendarIds.</p>							|

## Delete provider



	DELETE /providers/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>master access token.</p>							|

## Retrieve provider



	GET /providers/:id


## Retrieve providers



	GET /providers


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update provider



	PUT /providers/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| userId			| 			|  <p>Provider's userId.</p>							|
| serviceIds			| 			|  <p>Provider's serviceIds.</p>							|
| bankAccount			| 			|  <p>Provider's bankAccount.</p>							|
| calendarIds			| 			|  <p>Provider's calendarIds.</p>							|

# Service

## Create service



	POST /services


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| providerId			| 			|  <p>Service's providerId.</p>							|
| postcodes			| 			|  <p>Service's postcodes.</p>							|
| title			| 			|  <p>Service's title.</p>							|
| description			| 			|  <p>Service's description.</p>							|
| serviceCategory			| 			|  <p>Service's serviceCategory.</p>							|
| price			| 			|  <p>Service's price.</p>							|
| pictures			| 			|  <p>Service's pictures.</p>							|

## Delete service



	DELETE /services/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Retrieve service



	GET /services/:id


## Retrieve services



	GET /services


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update service



	PUT /services/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| providerId			| 			|  <p>Service's providerId.</p>							|
| postcodes			| 			|  <p>Service's postcodes.</p>							|
| title			| 			|  <p>Service's title.</p>							|
| description			| 			|  <p>Service's description.</p>							|
| serviceCategory			| 			|  <p>Service's serviceCategory.</p>							|
| price			| 			|  <p>Service's price.</p>							|
| pictures			| 			|  <p>Service's pictures.</p>							|

# User

## Create user



	POST /users


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>Master access_token.</p>							|
| email			| String			|  <p>User's email.</p>							|
| password			| String			|  <p>User's password.</p>							|
| name			| String			| **optional** <p>User's name.</p>							|
| picture			| String			| **optional** <p>User's picture.</p>							|
| role			| String			| **optional** <p>User's role.</p>							|

## Delete user



	DELETE /users/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|

## Retrieve current user



	GET /users/me


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|

## Retrieve user



	GET /users/:id


## Retrieve users



	GET /users


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update password



	PUT /users/:id/password

### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| Authorization			| String			|  <p>Basic authorization with email and password.</p>							|

### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| password			| String			|  <p>User's new password.</p>							|

## Update user



	PUT /users/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>User access_token.</p>							|
| name			| String			| **optional** <p>User's name.</p>							|
| picture			| String			| **optional** <p>User's picture.</p>							|


