import TComps from './comp/comp'
import createComp ,{addContent}  from './comp/tools/createComp'

import {useContext,useState,createElement} from 'react'
import {context} from './context'
const { Button, Card,List,ListItem,ListItemMeta,Avatar,Popover,Tag } = TComps
import View from './comp/View'

// 无状态 如果需要使用链式调用 需要return 
function MergeCard (content){
	return Card{
		Card{
			typeof content === 'function'?content():Button(content)
		}
	}
}
// 有状态

const Comp = createComp{
	const [change,setChange] = useState(false)
	const {dispatch,state} = useContext(context);
	Card{
		Button{
			Tag(state.count)
		}.onClick{dispatch({type:'add'})}

		Button('list change')
			.onClick{setChange(true)}
		MergeCard('dd')
		List {
			[1,3,3].forEach{
				ListItem(3)
			}
		}
		View()

	}.style({border:'1px solid red'})
}
export default Comp