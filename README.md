# project-R
community engagement application

![our wireframe](./images/wireframe1.png)

# User Story


- User should be able to sign up or login (if the user already has an account, they can login, but if not then they can sign up).
- Once logged in, user can see the public feed with all of the 'roars' (tweets/ posts)
- User can click on the communities link and see all of the communities there are 
- User is able to join communities 
- User can also create (add) communities
- When a user creates (or adds) a community, they are the admin of that community
- The user admin who creates the community and users in that community can make 'roars' (tweets/ posts) to that specific community that they click on and are a part of
- The user admin of the community is able to remove members or ban them
- The user admin of the community is also able to edit/delete 'roars'
- User and user admin can go to their own profile page and change their username and see all of the communities they are in
-The user admin also able to see all of the members they are an admin for and remove members (if members break any community rules)
- Users can remove themselves from communities, but not able to remove other users
- User is able to logout of account
- User can delete account along with all of their 'roars' (tweets/posts)

# Models 

- User {
		username: {
			type : String,
			required : true
		},
		password: {
			type : String,
			required: true,
		}
		firstName: String,
		lastName: String,
		isAdmin: false,
		banned: false,

	}
- Community {
		name: {
			type: String,
			required : true,
		},
		zip: {
			type: Number,
			required: true,
		},
		user: {
			ref : 'User'
		}
		roar: {
			ref : 'roar'
		}
	}
- Roar {
		title: {
			type : String
			required : true
		},
		content: String,
		date : Date.now,
		user{
			ref : 'User'
		}
		community: {
			ref : "Commmunity"
		}
		ref : null
	}
