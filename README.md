# Federee-BackEnd
Login Flow:

/api/auth/login expects { idToken }

Returns JWT and role

Protected Routes:

Requires Authorization: Bearer <token>

Smart Contract-Linked Routes:

/api/tickets/:eventId/issue

/api/polls/:pollId/vote
