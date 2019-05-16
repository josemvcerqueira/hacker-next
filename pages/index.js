import { Component, Fragment } from "react";
import fetch from "node-fetch";

import Error from "next/error";

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
				<div>
					{stories.map(story => (
						<h2 key={story.id}>{story.title}</h2>
					))}
				</div>
			</Fragment>
		);
	}
}

export default Index;
