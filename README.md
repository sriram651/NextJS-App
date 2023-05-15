# NextJS-App
A NextJS based application that uses wallets such as Metamask, Coinbase to authorize the user allow user to manage other users, perform operations like add, update, delete and view user details.

# Requirements
* NodeJS v18
* ReactJS v18

# Run the Application
* npm install
* npm run dev -- --port 3001

# JSON Server hosting for dummy data
* npx json-server --watch data/persondata.json
* This will trigger the json to be hosted using the NodeJS JSON-Sever in the port 3000, which we can access using the address - http://localhost:3000/json, where **json** is the resource point.

# Demo Snapshots
**Login Page**

![Login_Page](https://user-images.githubusercontent.com/55457863/237048419-22e5cd52-4d0d-4749-978a-ed715751ccd9.jpg)

**Dashboard Page**
Contains 3 filter options and Records per page to be displayed dropdown.

![Dashboard](https://github.com/sriram651/NextJS-App/assets/55457863/a54ba6ed-46d5-4768-adc9-5d5729e7504f)

**Dashboard Table with Delete Icon**
Records are sorted by the Address that added it.

![Delete Icon in Table](https://github.com/sriram651/NextJS-App/assets/55457863/b81dbe47-bf68-4973-8651-b996b3c3c4e5)

**Pagination in Table**
Client Side Pagination - Prefetched data is split into calculated number of pages.

![Pagination](https://github.com/sriram651/NextJS-App/assets/55457863/b842e4ee-618a-4664-88d2-836f603a6cd9)

**Add User Page**
Address of the account that adds the user will be directly added to the records.

![Add_User](https://user-images.githubusercontent.com/55457863/237049427-8b7c5c48-eff4-40c2-8c81-e006ddaf59dc.jpg)

**User Profile - No Access**

![No access](https://github.com/sriram651/NextJS-App/assets/55457863/137d4d43-df2b-48bb-b146-238e01cdc6ea)

**User profile - Update/Delete Page**

![User_Profile_Page](https://user-images.githubusercontent.com/55457863/237049540-3e2f9576-fcea-422c-a3a0-d695e354f9c4.jpg)
