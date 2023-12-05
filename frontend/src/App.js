import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useSearchParams } from 'react-router-dom';
import { publicRoutes, privateRoutes } from './router/router.js';
import {Lucid} from 'lucid-cardano'

// const {ethers} = require('ethers');
// const provider = new ethers.providers.Web3Provider(window.ethereum);

function App() {

	const [account, setAccount] = useState('');

	// window.cardano.on('accountsChanged', function (accounts) {
    //     fetchData();
    // });

	const fetchData = async () => {
		// const accounts = await provider.send("eth_requestAccounts", []);
		// const acc = ethers.utils.getAddress(accounts[0]);
		// setAccount(acc);

		const api = await window.cardano.lace.enable();
		const balance = (await api.getBalance()).toString()
		console.log(balance)
	}
	
	useEffect( () => {
		fetchData();
	},[])

	return (
		<Router>
			<div className="App">
				<Routes>
					{
						// account ==  ContractData.addressAdmin ? 
            false?
						privateRoutes.map((route, index) => {
							const Layout = route.component
							return (
								<Route
									key={index}
									path={route.path}
									element={
										<Layout />
									}
								/>
							);
						}) :
						publicRoutes.map((route, index) => {
							const Layout = route.component
							return (
								<Route
									key={index}
									path={route.path}
									element={
										<Layout />
									}
								/>
							);
						})
					}
				</Routes>
			</div>	
		</Router>
	);
}

export default App;