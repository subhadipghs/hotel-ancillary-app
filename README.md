## Quolity Fullstack Assignment

### 1. Requirements:

---

1. User can create a single hotel or multiple chain of hotels after sign up
2. User can create their hotel services and for each services they can add items in that service. e.g. _Food_ is service that can be created by the user and then they create an item _Burger_ in that service.
3. Add the guest to the hotel and then add check-in and check-out for the guest for better tracking.

### 2. API Requirements:

---

- [] Hotel CRUD(Single and Hotel Chain)
- [] Services and Items CRUD
- [] Add guest CRUD
- [] List of the hotels
- [] List of chains
- [] List of all the services
- [] Count of all the guests in the system

### 3. Multi-tenancy Application

---

1. For handling multi-tenancy we have two possible solution for segregation and isolation of data.

- Seperated DB for each tenant:
  - Pros:
    1. Tenant isolation is very high
    2. Can be very useful when we have more dynamic data and data differ largely from tenant to tenant
    3. Easier to spin up a new database if we have enough resources to make scale the application
    4. Easier to backup and restore for each tenant application
    5. Simple query and aggregates
  - Cons:
    1. Costly
    2. If we have more tens of thousands of tenants then creating each database
    3. Hardware resources cannot be fully utilized
    4. Manage the connection pool of the tenant's database
- Single DB multiple schema for each tenant:

  - Pros:
    1. Collection level tenant isolation
    2. Better disk space utilization of the resources than seperate DB method as each database
    3. Easier to implement
  - Cons:
    1. Costly for growing number of collections

- Shared DB, Sharded collection:
  - Pros:
    1. Best utilization of disk space and cpu resources
    2. Easier to scale with large number of tenants as we can just increase storage capacity of shards or introduce more shards
  - Cons:
    1. Complex query
    2. Document level isolation is provided
    3. Application level logic handling and required more testing for logical errors

### 3. Choosing the Database:

---

- As for each tenant there will be customized field for each service they create for the services and items.
  Data schemas needs to be dynamic for items. For dynamic fields NoSQL is a better choice as for a document under a single collection does not enforces any specific schema.
  And as I have experience in MongoDB so I'm choosing MongoDB for this application

### 4. Database Schemas:

---

![Database schemas!](/resources/database-schema.png "Database schema for application")

### 5. Application Architecture

![High Level Architecture!](/resources/high-level-architecture.png "High Level Architecture")

We're using microservices architecture here. There're 5 components in our architecture.

1.  API Gateway:
    - It's used as gateway for all the other api services like hotel service, items service and guest service.
    - It handles the Authentication and Authorization
    - It stores the tenant information
2.  Hotel services:
    - It handle CRUD operations for hotels
3.  Guest service:
    - It handles CRUD operations for guests
4.  Hotel Services and Items service:
    - It handles CRUD operation for a service and items of each service
5.  Database(MongoDB):
    - We're using MongoDB as database. and for handling multi-tenancy we're using schama based isolation for each tenant, where we'll create a seperated schema for each schema in the database.
      e.g Suppose there're two tenants Tenant1 and Tenant2.
      Each of them will have database entry in the _Tenants_ collection. If they perform CRUD operations for `Hotel` so we'll create seperate hotel collection for each tenant. For Tenant1 we'll create _Hotels.Id_Of_Tenant1_ collection and for Tenant2 we'll create
      _Hotels.Id_Of_Tenant2_ collection. If they perform CRUD operations for `Services and Items` then we'll create seperate collection for _Services.Id_of_Tenant1_ and _Services.Id_of_Tenant2_ and similarly we'll create seperate collection for Guests as well.
      ![Multi-tenant Application for Database](/resources/multi-tenant-architecture.png)
