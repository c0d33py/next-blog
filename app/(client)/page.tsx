import { client } from "@/sanity/lib/client";
import Header from "../components/Header";
import PostComponent from "../components/PostComponent";
import { Post } from "../utils/interface";

async function getPosts() {
	const query = `
	*[_type == "post"]{
		_id,
		title,
		slug,
		publishedAt,
		excerpt,
		tags[]-> {
			_id,
			name,
			slug
		}
	}`;

	const posts = await client.fetch(query);
	return posts;
}

export const revalidate = 60;

export default async function Home() {
	const posts: Post[] = await getPosts();
	return (
		<div>
			<Header title="Articles" tags />
			<div>
				{posts.map((post) => (
					<PostComponent key={post._id} post={post} />
				))}
			</div>
		</div>
	);
}
