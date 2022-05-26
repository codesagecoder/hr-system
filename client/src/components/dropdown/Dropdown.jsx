import React from 'react';
import './dropdown.css'

export default function Dropdown({ options, placeholder, width, handleSelection }) {
    const [showOptions, setShowOptions] = React.useState(false)
    const [selected, setSelected] = React.useState('')
    const dropdownRef = React.useRef(null);

    React.useEffect(() => {
        if (!showOptions) return
        function handleClick(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowOptions(false);
            }
        }
        window.addEventListener("click", handleClick);
        return () => window.removeEventListener("click", handleClick);
    }, [showOptions]);

    return (
        <div className="dropdown-container" style={{ width }}>
            <div
                className="dropdown__header"
                ref={dropdownRef}
                onClick={() => { setShowOptions(true) }}
            >
                <p className="dropdown__text">{selected || placeholder}</p>
                <i className="fa fa-sort-desc dropdown__icon" aria-hidden="true"></i>
            </div>
            <div
                className="dropdown__options"
                style={showOptions ? { height: `calc(50px * ${options.length})` } : { height: 0 }}
            >
                {
                    options.map((value, index) => (
                        <div key={index} className="dropdown__option" onClick={
                            () => {
                                setShowOptions(false)
                                setSelected(value.name)
                                handleSelection(value.value)
                            }
                        }>
                            <p className="dropdown__text">{value.name}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}