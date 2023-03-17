import icon from '../img/icon.svg';

const Footer = () => {
    return (
        <div className="bg-[#faf1ed]">
            <div className="container mx-auto px-4 py-6">
                <div className="grid grid-cols-12 text-gray-800">
                    <div className="col-span-12 lg:col-span-8 space-y-2 text-dark">
                        <div className="flex space-x-3">
                            <img src={icon} alt="" className="h-10 w-10" />
                            <div className="w-fit">
                                <p className="text-xs">
                                    © 2023 WanderWizard LLC All rights reserved.
                                </p>
                                <div className="flex flex-wrap">
                                    {["Terms of Use", "Privacy and Cookies Statement", "Cookie consent", "Site Map", "How the site works"].map((item, i) => (
                                        <a key={i} href="#" className="text-[0.8em] md:text-sm font-bold underline mr-2">
                                            {item}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;