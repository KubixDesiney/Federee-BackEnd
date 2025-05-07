# Federee-BackEnd
# Federee Backend API

This is the backend for the Federee platform — a decentralized club & event system using Web3Auth for login, MongoDB for data, and Ethereum smart contracts for ticketing and polls.

---

## 📦 Tech Stack

- **Node.js / Express**
- **MongoDB / Mongoose**
- **Web3 / Web3Auth**
- **JWT Authentication**
- **Smart Contract Interaction (via Web3)**
- **Mocha + Chai + Supertest (for testing)**

---

## 🚀 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/KubixDesiney/Federee-BackEnd.git
cd Federee-BackEnd
```
2. Install Dependencies
bash
Copy
Edit
npm install
3. Set Up .env
Create a .env file at the root:

env
Copy
Edit
PORT=4000
MONGO_URI=mongodb://localhost:27017/InterClubBD
JWT_SECRET=your_jwt_secret_key
WEB3AUTH_CLIENT_ID=your_web3auth_client_id
INFURA_PROJECT_ID=your_infura_id
CONTRACT_ADDRESS=0xYourContractAddress
CHAIN_ID_HEX=0x5
WEB3_PROVIDER=https://goerli.infura.io/v3/your_infura_id
✅ Rename MONGO_URI if using MONGODB_URI in your code.

🧪 Running Tests
bash
Copy
Edit
npm test
🧬 Includes Tests For:
Auth (login)

Club creation

Events

Poll voting

🔐 Auth Flow
Login via Web3Auth → POST /api/auth/login

Receive a JWT

Use Bearer token in protected requests:

makefile
Copy
Edit
Authorization: Bearer <your_token>
Roles: Member, Admin, Founder

📮 Postman Collection
A full Postman collection is available here:
📁 docs/postman_federee_api.json

Includes:

/api/auth/login

/api/club

/api/events

/api/polls/:pollId/vote

Token auto-injected after login using {{auth_token}}.

📡 API Endpoints
Method	Endpoint	Description
POST	/api/auth/login	Web3 login via ID token
POST	/api/club	Create a new club
POST	/api/club/:id/join	Join a club
POST	/api/events	Create event
PUT	/api/events/:id	Update event
POST	/api/polls/:id/vote	Vote on a poll
POST	/api/tickets/:id/issue	Issue a ticket (Web3)
GET	/api/discussion/:id	Get messages
POST	/api/discussion/:id	Post a message

🛠 Development Scripts
bash
Copy
Edit
npm start        # Run server
npm run dev      # Run with nodemon
npm test         # Run tests
🧱 Folder Structure
bash
Copy
Edit
/controllers      → Logic for each route
/routes           → Route definitions
/models           → Mongoose schemas
/middleware       → Auth middleware (JWT + roles)
/config           → DB + Web3 connection
/tests            → Mocha/Chai test files
/docs             → Postman + API docs
🚀 Deployment
This project is ready for:

 Docker (see Dockerfile)

 GitHub Actions CI (.github/workflows/node-ci.yml)

 Railway / Render / Heroku

👨‍💻 Maintainer
Built by @KubixDesiney
Feel free to open issues or suggestions!
