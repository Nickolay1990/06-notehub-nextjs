import css from './Footer.module.css';

function Footer() {
	return (
		<footer className={css.footer}>
			<div className={css.content}>
				<p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
				<div className={css.wrap}>
					<p>Developer: Nick</p>
					<p>
						Contact us:
						<a href="mailto:bogdanovichkolia1990@gmail.com">bogdanovichkolia1990@gmail.com</a>
					</p>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
