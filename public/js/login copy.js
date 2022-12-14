const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/homepage');
    } else {
      alert('Failed to log in.');
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#username-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (username && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/homepage');
    } else {
      alert('Failed to sign up.');
    }
  }
};


// const newPostHandler =  () => {
//   console.log("it hears")
// };


const newPostHandler = async (event) => {
  

  const postText = document.querySelector('#postText').value.trim();
  const postTitle = document.querySelector('#titleText').value.trim();

  if (postText && postTitle) {
    const response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({ postTitle, postText}),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/homepage');
    } else {
      alert('Failed to post.');
    }
  }
};

// const newComentHandler = async (event) => {
  

//   const commentText = document.querySelector('#commentText');

//   if (commentText) {
//     console.log("i hear you")
//   }
// };


const newComentHandler = async (event) => {
  

  const commentText = document.querySelector('#commentText').value.trim();
  const blogId =document.getElementById("blogid");
  let id = blogId.getAttribute("class");
  console.log(id);

  if (commentText) {
    const response = await fetch('/api/posts/comment', {
      method: 'POST',
      body: JSON.stringify({ commentText,id}),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/posts/'+id);
    } else {
      alert('Comment Failed.');
    }
  }
};


const postDeleteHandler = async function(event) {

  const postId =document.getElementById("postid");
  let id = postId.getAttribute("class");

  
  const response = await fetch('/api/dashboard/delete/:'+id, {
    method: 'DELETE',
    body:  JSON.stringify({"id": id}),
    headers: { 'Content-Type': 'application/json' },
  });
  console.log( event)

  if (response.ok) {
    document.location.reload(); 
  }
}


document
  .querySelector('.postid')
  .addEventListener('click', postDeleteHandler);


document
  .querySelector('#loginSubmit')
  .addEventListener('click', loginFormHandler);

document
  .querySelector('#submitSignup')
  .addEventListener('click', signupFormHandler);

  document
  .querySelector('#submitPost')
  .addEventListener('click', newPostHandler);

  document
  .querySelector('#submitComment')
  .addEventListener('click', newComentHandler);
