import Header from "@/app/components/Header";
import { Post } from "@/app/utils/interface";
import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import Image from "next/image";
import { notFound } from "next/navigation";

import { PortableText } from "@portabletext/react";
import { VT323 } from "next/font/google";
import Link from "next/link";

const dateFont = VT323({ weight: "400", subsets: ["latin"] });

async function getPost(slug: string) {
	const query = `
  *[_type == "post" && slug.current == "${slug}"][0] {
    title,
    slug,
    publishedAt,
    excerpt,
    _id,
    "headings": body[style in ["h2", "h3", "h4", "h5", "h6"]],
    body,
    tags[]-> {
      _id,
      slug,
      name
    }
  }
  `;
	const post = await client.fetch(query, { slug });
	return post;
}

interface Params {
	params: {
		slug: string;
	};
}

const page = async ({ params }: Params) => {
	const post: Post = await getPost(params.slug);

	if (!post) {
		notFound();
	}

	return (
		<div>
			<Header title={post.title} />
			<div className="text-center">
				<span className={`${dateFont.className} text-purple-500`}>{new Date(post.publishedAt).toDateString()}</span>
				<div className="mt-5">
					{post?.tags?.map((tag) => (
						<Link key={tag?._id} href={`/tag/${tag.slug.current}`}>
							<span className="mr-2 p-1 rounded-sm text-sm lowercase dark:bg-gray-950 border dark:border-gray-900">#{tag.name}</span>
						</Link>
					))}
				</div>
				<div className={richTextStyle}>
					<PortableText value={post.body} components={portableTextComponent} />
				</div>
			</div>
		</div>
	);
};

export default page;

const portableTextComponent = {
	types: {
		image: ({ value }: any) => <Image src={urlForImage(value)} alt="Post" width={700} height={700} />,
	},
};

const richTextStyle = `
mt-14
text-justify
max-w-2xl
m-auto
prose-headings:my-4
prose-heading:text-2xl
prose-p:mb-5
prose-p:leading-7
prose-li:list-disc
prose-li:leading-7
prose-li:ml-4
`;
