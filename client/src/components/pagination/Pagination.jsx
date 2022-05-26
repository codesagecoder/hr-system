import './pagination.css'

export default function Pagination({ perPage, count, setPage }) {

    function pages() {
        let n = (count / perPage);
        console.log()
        let amountOfPages = Math.ceil(n / 1) * 1
        let pages = []
        for (let i = 1; i <= amountOfPages; i++) {
            pages.push(<button className="pagination__btn" onClick={() => setPage(i)} key={i}>{i}</button>)
        }

        return pages
    }

    return (
        <span className="pagination">
            {pages()}
        </span>
    )
}
