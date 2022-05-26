import Dropdown from '../dropdown/Dropdown'
import './search.css'

export default function Search({ count, setPerPage }) {
    return (
        <div className="search">
            <span className="search__dropdown">
                <label className="search__label">Show Per Page</label>
                <Dropdown
                    handleSelection={setPerPage}
                    width='14rem'
                    options={[
                        { name: '10', value: 10 },
                        { name: '20', value: 20 },
                        { name: '50', value: 50 },
                        { name: '100', value: 100 },
                        { name: 'All', value: count },
                    ]}
                    placeholder='10 / 20 / All'
                />
            </span>
            <input className="search__input" type="text" placeholder="Search..." />
        </div>
    )
}
