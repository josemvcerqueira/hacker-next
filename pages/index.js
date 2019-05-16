import { Component, Fragment } from "react";
import Error from "next/error";
import fetch from "node-fetch";

import StoryList from "../components/StoryList";

class Index extends Component {
	static async getInitialProps() {
		let stories;
		try {
			const response = await fetch(
				"https://node-hnapi.herokuapp.com/news?page=1"
			);
			stories = await response.json();
		} catch (error) {
			console.log(error);
			stories = [];
		}
		return { stories };
	}

	render() {
		const { stories } = this.props;

		if (!stories.length) {
			return <Error statusCode={503} />;
		}
		return (
			<Fragment>
				<div>Hacker Next</div>
				<StoryList stories={stories} />
			</Fragment>
		);
	}
}

export default Index;
