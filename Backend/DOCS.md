# api v0.0.0



- [Auth](#auth)
	- [Authenticate](#authenticate)
	
- [Customer](#customer)
	- [Create customer](#create-customer)
	- [Delete customer](#delete-customer)
	- [Retrieve customer](#retrieve-customer)
	- [Retrieve customers](#retrieve-customers)
	- [Update customer](#update-customer)
	
- [MeetingSlot](#meetingslot)
	- [Create meeting slot](#create-meeting-slot)
	- [Delete meeting slot](#delete-meeting-slot)
	- [Retrieve meeting slot](#retrieve-meeting-slot)
	- [Retrieve meeting slots](#retrieve-meeting-slots)
	- [Update meeting slot](#update-meeting-slot)
	
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

# Customer

## Create customer



	POST /customers


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| street			| 			|  <p>Customer's street.</p>							|
| number			| 			|  <p>Customer's number.</p>							|
| postcode			| 			|  <p>Customer's postcode.</p>							|
| bankInformation			| 			|  <p>Customer's bankInformation.</p>							|

## Delete customer



	DELETE /customers/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Retrieve customer



	GET /customers/:id


## Retrieve customers



	GET /customers


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update customer



	PUT /customers/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| street			| 			|  <p>Customer's street.</p>							|
| number			| 			|  <p>Customer's number.</p>							|
| postcode			| 			|  <p>Customer's postcode.</p>							|
| bankInformation			| 			|  <p>Customer's bankInformation.</p>							|

# MeetingSlot

## Create meeting slot



	POST /meeting-slots


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| serviceId			| 			|  <p>Meeting slot's serviceId.</p>							|
| date			| 			|  <p>Meeting slot's date.</p>							|
| status			| 			|  <p>Meeting slot's status.</p>							|
| bookingId			| 			|  <p>Meeting slot's bookingId.</p>							|
| street			| 			|  <p>Meeting slot's street.</p>							|
| number			| 			|  <p>Meeting slot's number.</p>							|
| postcode			| 			|  <p>Meeting slot's postcode.</p>							|

## Delete meeting slot



	DELETE /meeting-slots/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

## Retrieve meeting slot



	GET /meeting-slots/:id


## Retrieve meeting slots



	GET /meeting-slots


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| q			| String			| **optional** <p>Query to search.</p>							|
| page			| Number			| **optional** <p>Page number.</p>							|
| limit			| Number			| **optional** <p>Amount of returned items.</p>							|
| sort			| String[]			| **optional** <p>Order of returned items.</p>							|
| fields			| String[]			| **optional** <p>Fields to be returned.</p>							|

## Update meeting slot



	PUT /meeting-slots/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| serviceId			| 			|  <p>Meeting slot's serviceId.</p>							|
| date			| 			|  <p>Meeting slot's date.</p>							|
| status			| 			|  <p>Meeting slot's status.</p>							|
| bookingId			| 			|  <p>Meeting slot's bookingId.</p>							|
| street			| 			|  <p>Meeting slot's street.</p>							|
| number			| 			|  <p>Meeting slot's number.</p>							|
| postcode			| 			|  <p>Meeting slot's postcode.</p>							|

# Provider

## Create provider



	POST /providers


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|
| street			| 			|  <p>Provider's street.</p>							|
| number			| 			|  <p>Provider's number.</p>							|
| postcode			| 			|  <p>Provider's postcode.</p>							|
| bankInformation			| 			|  <p>Provider's bankInformation.</p>							|

## Delete provider



	DELETE /providers/:id


### Parameters

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
| access_token			| String			|  <p>user access token.</p>							|

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
| street			| 			|  <p>Provider's street.</p>							|
| number			| 			|  <p>Provider's number.</p>							|
| postcode			| 			|  <p>Provider's postcode.</p>							|
| bankInformation			| 			|  <p>Provider's bankInformation.</p>							|

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
| category			| 			|  <p>Service's category.</p>							|
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
| category			| 			|  <p>Service's category.</p>							|
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


