import React from 'react'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import Page from './pages/Page'
import Page2 from './pages/Page2'
import HomePage from './pages/HomePage'
import NotFound from './pages/NotFound'

const App = () => {
	return (
		<Router>
			<header>
				<h1>Welcome to Star Wars Transport and Personnel</h1>
				<nav>
					<ul>
						<li>
							<Link to="/1">View or delete Ships and Personnel</Link>
						</li>
						<li>
							<Link to="/2">Add or Edit Ships or Personnel</Link>
						</li>
						<li>
							<Link to="/">HomePage</Link>
						</li>
					</ul>
				</nav>
			</header>
			<Switch>
				<Route exact path="/" component={HomePage} />
				<Route exact path="/1" component={Page} />
				<Route exact path="/2" component={Page2} />
				<Route path="*" component={NotFound} />
			</Switch>
		</Router>
	)
}

export default App
