import React , { useState }from 'react'
import ReactDataSheet from 'react-datasheet';
import 'react-datasheet/lib/react-datasheet.css';


export const Sheet = () => {
    const grid = [
        [
          {readOnly: true, value: ''},
          {value: 'A', readOnly: true},
          {value: 'B', readOnly: true},
          {value: 'C', readOnly: true},
          {value: 'D', readOnly: true}
        ],
        [{readOnly: true, value: 1}, {value: 'adenozin'}, {value: 3}, {value: 3}, {value: 3}],
        [{readOnly: true, value: 2}, {value: 2}, {value: 4}, {value: 4}, {value: 4}],
        [{readOnly: true, value: 3}, {value: 1}, {value: 3}, {value: 3}, {value: 3}],
        [{readOnly: true, value: 4}, {value: 2}, {value: 4}, {value: 4}, {value: 4}]
      ]
    const [myState, setMyState] = useState(grid)

    
    return (
        <ReactDataSheet
        data={myState}
        overflow={'wrap'}
        valueRenderer={(cell) => cell.value}
        onContextMenu={(e, cell, i, j) => cell.readOnly ? e.preventDefault() : null}
        onCellsChanged={changes => {
          const grid = myState.map(row => [...row])
          changes.forEach(({cell, row, col, value}) => {
            grid[row][col] = {...grid[row][col], value}
          })
          setMyState(grid)
        }}
      />
    )
};

export default class BasicSheet extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        grid: [
          [
            {readOnly: true, value: ''},
            {value: 'A', readOnly: true},
            {value: 'B', readOnly: true},
            {value: 'C', readOnly: true},
            {value: 'D', readOnly: true}
          ],
          [{readOnly: true, value: 1}, {value: 'adenozin'}, {value: 3}, {value: 3}, {value: 3}],
          [{readOnly: true, value: 2}, {value: 2}, {value: 4}, {value: 4}, {value: 4}],
          [{readOnly: true, value: 3}, {value: 1}, {value: 3}, {value: 3}, {value: 3}],
          [{readOnly: true, value: 4}, {value: 2}, {value: 4}, {value: 4}, {value: 4}]
        ]
      }
    }
    render () {
      return (
        <ReactDataSheet
          data={this.state.grid}
          overflow={'wrap'}
          valueRenderer={(cell) => cell.value}
          onContextMenu={(e, cell, i, j) => cell.readOnly ? e.preventDefault() : null}
          onCellsChanged={changes => {
            const grid = this.state.grid.map(row => [...row])
            changes.forEach(({cell, row, col, value}) => {
              grid[row][col] = {...grid[row][col], value}
            })
            this.setState({grid})
          }}
        />
      )
    }
  }