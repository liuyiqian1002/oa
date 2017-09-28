import React,{Component} from 'react';


const liStyle = {
    // display:'flex',
    // justifyContent:'space-around',
    border:'1px solid #eee',
    // marginBottom:'20px',
    lineHeight:'40px',
    width:'72%',
    paddingLeft:'3%'
}

const OperateRecord = (props) =>{
    // console.log(props)
    return <ul style={props.style}>
        {props.data.map((value,index)=>{
            return <li key={index} style={liStyle}>
                <span>任务“{value.taskTitle}”</span>
                <span>由{value.userName}</span>
                {value.type === 0 && <span style={{color:'red'}}>初始创建</span>}
                {value.type === 1 && <span style={{color:'#49a9ee'}}>提交</span>}
                {value.type === 2 && <span style={{color:'#49a9ee'}}>退回</span>}
                {value.type === 3 && <span style={{color:'red'}}>修改</span>}
                {value.type === 4 && <span style={{color:'green'}}>审核通过</span>}
            </li>
        })}
    </ul>
}

export default OperateRecord;