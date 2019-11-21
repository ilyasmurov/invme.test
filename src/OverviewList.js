import React from "react";
import { AutoSizer, WindowScroller, List } from "react-virtualized";

class OverviewList extends React.PureComponent {
  render() {
    const { items, container } = this.props;
    return (
      <WindowScroller scrollElement={container}>
        {({ height, isScrolling, registerChild, scrollTop }) => {
          return (
            <AutoSizer disableHeight>
              {({ width }) => {
                return (
                  <div ref={registerChild}>
                    {height &&
                      ((items && items.length > 0)
                        ? <List
                            autoHeight
                            height={height}
                            isScrolling={isScrolling}
                            rowCount={items.length}
                            rowHeight={100}
                            rowRenderer={({ key, index, style }) => {
                              return (
                                <div className={"list-row"} key={key} style={style}>
                                  <div style={{display:'flex',flexDirection:'row',padding:'0 30px'}}>
                                    <div style={{width:'50px',margin:'auto'}}>
                                      <div style={{'overflow':'hidden',borderRadius:'50%', width:'50px',height:'50px'}}>
                                        <img style={{maxWidth:'100%'}} src={items[index].avatar} alt='' />
                                      </div>
                                    </div>
                                    <div style={{display:'flex',flexDirection:'column',flex: 1,paddingLeft:'20px'}}>
                                      <div style={{margin:'auto 0'}}>
                                        <h3 style={{margin:'0'}}>{items[index].name}</h3>
                                        <font color='grey'>{items[index].country}, {items[index].city}</font>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            }}
                            scrollTop={scrollTop}
                            width={width}
                          />
                        : <div>Nothing was found</div>
                      )
                    }
                  </div>
                );
              }}
            </AutoSizer>
          );
        }}
      </WindowScroller>
    );
  }
}

export default OverviewList;
