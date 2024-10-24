import notFound from "../assets/notFound.svg";

export default function NotFound() {
    return (
        <section className="main-content bg-image">
            <section className="container not-found">
                <h1 className="heading-text">Page not found</h1>
                <img width="200px" src={notFound} />
            </section>
        </section>
    );
}
