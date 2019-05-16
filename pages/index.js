import { Component } from "react";
import Error from "next/error";
import Link from "next/link";
import fetch from "node-fetch";

import Layout from "../components/Layout";
import StoryList from "../components/StoryList";

class Index extends Component {
	static async getInitialProps({ req, res, query }) {
		let stories;
		let page;
		try {
			page = Number(query.page) || 1;
			const response = await fetch(
				`https://node-hnapi.herokuapp.com/news?page=${page}`
			);
			stories = await response.json();
		} catch (error) {
			console.log(error);
			stories = [];
		}
		return { stories, page };
	}

	render() {
		const { stories, page } = this.props;

		if (!stories.length) {
			return <Error statusCode={503} />;
		}
		return (
			<Layout
				title="Hacker Next"
				description="A Hacker News clone made with Next.js"
			>
				<StoryList stories={stories} />
				<footer>
					<Link href={`/?page=${page + 1}`}>
						<a>Next page ({page + 1})</a>
					</Link>
				</footer>
				<style jsx>
					{`
						footer {
							padding: 1em;
						}
						footer a {
							font-weight: bold;
							color: black;
							text-decoration: none;
						}
					`}
				</style>
			</Layout>
		);
	}
}

export default Index;
