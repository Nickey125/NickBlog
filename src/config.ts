import type {
	ExpressiveCodeConfig,
	LicenseConfig,
	NavBarConfig,
	ProfileConfig,
	SiteConfig,
} from "./types/config";
import { LinkPreset } from "./types/config";

export const siteConfig: SiteConfig = {
	title: "NickderBlog",
	subtitle: "Demo Site",
	lang: "zh_CN", // 语言代码，例如 'en'（英语）、'zh_CN'（简体中文）、'ja'（日语）等
	themeColor: {
		hue: 345, // 主题色的默认色相，取值范围为 0～360，例如红色：0、粉色：345
		fixed: true, // 是否对访客隐藏主题色选择器
	},
	banner: {
		enable: true,
		src: "assets/images/self-banner.png", // 图片路径相对于 /src 目录；以 '/' 开头时，相对于 /public 目录
		position: "center", // 相当于 CSS 的 object-position，仅支持 'top'（顶部）、'center'（居中）、'bottom'（底部），默认居中
		credit: {
			enable: false, // 是否显示横幅图片的署名文字
			text: "", // 要显示的署名文字
			url: "", // （可选）原作品或作者页面的链接
		},
	},
	toc: {
		enable: true, // 是否在文章右侧显示目录
		depth: 2, // 目录显示的最大标题层级，取值范围为 1～3
	},
	favicon: [
		// 将此数组留空即可使用默认的网站图标（favicon）
		// {
		//   src: '/favicon/icon.png',    // 网站图标路径，相对于 /public 目录
		//   theme: 'light',              // （可选）'light'（浅色）或 'dark'（深色），仅在两种模式使用不同图标时设置
		//   sizes: '32x32',              // （可选）网站图标尺寸，仅在提供多种尺寸的图标时设置
		// }
	],
};

export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home,
		LinkPreset.Archive,
		LinkPreset.About,
		{
			name: "GitHub",
			url: "https://github.com/saicaca/fuwari", // 站内链接无需包含基础路径（base），程序会自动添加
			external: true, // 是否显示外部链接图标，并在新标签页中打开
		},
	],
};

export const profileConfig: ProfileConfig = {
	avatar: "assets/images/selfset.png", // 头像路径相对于 /src 目录；以 '/' 开头时，相对于 /public 目录
	name: "Nick125",
	bio: "一个爱技术，爱整活，爱二次元的技术宅（伪",//Lorem ipsum dolor sit amet, consectetur adipiscing elit.
	links: [
		{
			name: "Bilibili",
			icon: "fa6-brands:bilibili",  
			// 可在 https://icones.js.org/ 查找图标代码
			// 如果项目尚未包含所需的图标集，需要先安装对应的图标集
			// `pnpm add @iconify-json/<icon-set-name>`
			url: "https://space.bilibili.com/671437030",
		},
		{
			name: "Github",
			icon: "fa6-brands:github",
			url: "https://github.com/Nickey125",
		},
		{
			name: "QQ",
			icon: "fa6-brands:qq",
			url: "#",
		},
	],
};

export const licenseConfig: LicenseConfig = {
	enable: true,
	name: "CC BY-NC-SA 4.0",
	url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
};

export const expressiveCodeConfig: ExpressiveCodeConfig = {
	// 注意：部分样式（如背景色）已被覆盖，详见 astro.config.mjs 文件
	// 请选择深色代码高亮主题，因为当前博客主题的代码块仅支持深色背景
	theme: "github-dark",
};
