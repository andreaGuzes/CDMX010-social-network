// importamos la funcion que vamos a testear
import { homeTemplate } from '../src/lib/views/home.js'

describe('Test post', ()=>{
	beforeEach(() => {
		document.body.innerHTML = '<div id="root"></div>';
	});

	test('deberia renderizar', async () => {
		const target = document.getElementById('root');
		const posts = [{ 
			id: 'dhdshjdhs32736743',
			title: 'test', 
			postDescription: 'Aquí el mensaje de tu post',
			likes: []
		}]; 
		const getPostById = jest.fn().mockImplementation(() => Promise.resolve(posts[0]));
		const getAllPosts = jest.fn().mockImplementation(() => Promise.resolve(posts));
		const getUser = jest.fn().mockImplementation(() => {
			return { email: 'test@laboratoria.la', name: 'test' }
		});
		const firebase = { getPostById, getUser, getAllPosts };
		await homeTemplate (target, firebase);
		expect (target.innerHTML).toMatchSnapshot();
	});

	test('comportamiento del boton', async () => {
		const target = document.getElementById('root');
		const posts = [{ 
			id: 'dhdshjdhs32736743',
			title: 'test', 
			postDescription: 'Aquí el mensaje de tu post',
			likes: []
		}]; 
		const getPostById = jest.fn().mockImplementation(() => Promise.resolve(posts[0]));
		const getAllPosts = jest.fn().mockImplementation(() => Promise.resolve(posts));
		const getUser = jest.fn().mockImplementation(() => {
			return { email: 'test@laboratoria.la', name: 'test' }
		});
		const firebase = { getPostById, getUser, getAllPosts };
		await homeTemplate (target, firebase);
		
		const buttonSave = document.getElementById("btn-post-form");
		buttonSave.click();
		expect (target.innerHTML).toMatchSnapshot();
	});

	test('comportamiento del botton signOut', async () => {
		const target = document.getElementById('root');
		const posts = [{ 
			id: 'dhdshjdhs32736743',
			title: 'test', 
			postDescription: 'Aquí el mensaje de tu post',
			likes: []
		}]; 
		const loginTemplate = [{
			emailSignIn: 'test@laboratoria.la',
			passwordSignIn: '123456789'
		}];
		const getPostById = jest.fn().mockImplementation(() => Promise.resolve(posts[0]));
		const getAllPosts = jest.fn().mockImplementation(() => Promise.resolve(posts));
		const getUser = jest.fn().mockImplementation(() => {
			return { email: 'test@laboratoria.la', name: 'test' }
		});
		const signOut  = jest.fn().mockImplementation(() => Promise.resolve(loginTemplate));
		const firebase = { getPostById, getUser, getAllPosts, signOut };
		await homeTemplate (target, firebase);
	
		const buttonExit = document.getElementById("signOutBtn");
			buttonExit.click();
			expect (target.innerHTML).toMatchSnapshot();
	});

	test('debe renderizar likePost', async () => {
		const target = document.getElementById('root');
		const posts = [{ 
			id: 'dhdshjdhs32736743',
			title: 'test', 
			postDescription: 'Aquí el mensaje de tu post',
			likes: []
		}]; 
		
		const getPostById = jest.fn().mockImplementation(() => Promise.resolve(posts[0]));
		const getAllPosts = jest.fn().mockImplementation(() => Promise.resolve(posts));
		const getUser = jest.fn().mockImplementation(() => {
			return { email: 'test@laboratoria.la', name: 'test' }
		});
		const likePost = jest.fn().mockImplementation(() => {
			return { id: "dflkuutd3456", email: 'test@laboratoria.la' }
		});

		const firebase = { getPostById, getUser, getAllPosts, likePost };
		await homeTemplate (target, firebase);
		expect (target.innerHTML).toMatchSnapshot();
	});

	test('comportamiento del botton like', async () => {
		const target = document.getElementById('root');
		const posts = [{ 
			id: 'dhdshjdhs32736743',
			title: 'test', 
			postDescription: 'Aquí el mensaje de tu post',
			likes: []
		}]; 
		
		const getPostById = jest.fn().mockImplementation(() => Promise.resolve(posts[0]));
		const getAllPosts = jest.fn().mockImplementation(() => Promise.resolve(posts));
		const getUser = jest.fn().mockImplementation(() => {
			return { email: 'test@laboratoria.la', name: 'test' }
		});
		const likePost = jest.fn().mockImplementation(() => {
			return { id: "dflkuutd3456", email: 'test@laboratoria.la' }
		});
		
		const firebase = { getPostById, getUser, getAllPosts, likePost };
		await homeTemplate (target, firebase);
		
		const buttonLike = document.getElementById("likeBtn");
			buttonLike.click();
			expect (target.innerHTML).toMatchSnapshot();
	});



});





