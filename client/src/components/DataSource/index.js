import React from 'react'

export const DataSource = ({ values, setValues }) => {
    return (
        <div style={{ padding: '40px' }}>
            <form>
                <label htmlFor="dataSource">Choose a dataSource:</label>
                <select name="dataSource" id="dataSource">
                    <option value="today">Today</option>
                    <option value="yesterday">Yesterday</option>
                </select>
            </form>
            <button onClick={() => console.log(document.getElementById('dataSource').value)}>Submit</button>
        </div>
    )
}
