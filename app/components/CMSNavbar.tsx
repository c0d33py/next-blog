import { Lilita_One } from "next/font/google";
import Link from "next/link";
import { BackArrowIcon } from "./Icons";

const lilitaOne = Lilita_One({ weight: "400", subsets: ["latin"] });

const CmsNavbar = () => {
	return (
		<div className="flex justify-between items-center py-1 px-5">
			<Link href="/">
				<BackArrowIcon />
			</Link>
			<Link href="/">
				<div className={`${lilitaOne.className} text-3xl dark:text-amber-50`}>
					Moon
					<span className="text-purple-500">Blook</span>
				</div>
			</Link>
		</div>
	);
};

export default CmsNavbar;
