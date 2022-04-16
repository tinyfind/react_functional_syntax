const { useState, createElement } = React
const Div = generateCompClass('div')

// 链式调用 目前不具备语义化 Comp().setConfig().setConfig(p)
// const config = {
//   Button:["block","danger","disabled","ghost","href","htmlType","icon","loading","shape","size","target","type","onclick"],
// }


// 暴露antd所有组件
function updateFunctionComp(materials, prevStr) {
	// 针对首字母大写的key
	Object.keys(materials).filter(compName => compName[0].charCodeAt() <= 90 && compName[0].charCodeAt() >= 60).forEach(compName => {
		updateFunctionComp(materials[compName], compName)
		Object.defineProperty(this, `${prevStr}${compName}`, {
			value: createCompProxy(materials[compName])
		})
	})
}
updateFunctionComp(antd, '')

function ForEach(list) {
	return list
}

const TableTransfer = createCompProxy(
	({ leftColumns, rightColumns, ...restProps }) => (
		new Transfer(
			
		).addProp(restProps)
		.addProp({children:({
			direction,
			filteredItems,
			onItemSelectAll,
			onItemSelect,
			selectedKeys: listSelectedKeys,
			disabled: listDisabled,
		}) => {
			const columns = direction === 'left' ? leftColumns : rightColumns;

			const rowSelection = {
				getCheckboxProps: item => ({
					disabled: listDisabled || item.disabled
				}),
				onSelectAll(selected, selectedRows) {
					const treeSelectedKeys = selectedRows
						.filter(item => !item.disabled)
						.map(({
							key
						}) => key);
					const diffKeys = selected ?
						difference(treeSelectedKeys, listSelectedKeys) :
						difference(listSelectedKeys, treeSelectedKeys);
					onItemSelectAll(diffKeys, selected);
				},
				onSelect({
					key
				}, selected) {
					onItemSelect(key, selected);
				},
				selectedRowKeys: listSelectedKeys,
			};

			return (
				new Table()
					.rowSelection(rowSelection)
					.columns(columns)
					.dataSource(filteredItems)
					.size('small')
					.style({
						pointerEvents: listDisabled ? 'none' : null
					})
					.onRow(({key,disabled: itemDisabled}) => ({
						onClick: () => {
							if (itemDisabled || listDisabled) return;
							onItemSelect(key, !listSelectedKeys.includes(key));
						},
					}))
			);
		}})
	)
)
const mockTags = ['cat', 'dog', 'bird'];
const mockData = [];
for (let i = 0; i < 20; i++) {
	mockData.push({
		key: i.toString(),
		title: `content${i + 1}`,
		description: `description of content${i + 1}`,
		disabled: i % 4 === 0,
		tag: mockTags[i % 3],
	});
}

const originTargetKeys = mockData.filter(item => +item.key % 3 > 1).map(item => item.key);

const leftTableColumns = [{
		dataIndex: 'title',
		title: 'Name',
	},
	{
		dataIndex: 'tag',
		title: 'Tag',
		render: tag => new Tag(tag),
	},
	{
		dataIndex: 'description',
		title: 'Description',
	},
];
const rightTableColumns = [{
	dataIndex: 'title',
	title: 'Name',
}, ];

const App = createCompProxy(
	class extends React.Component {
		state = {
			targetKeys: originTargetKeys,
			disabled: false,
			showSearch: false,
		};
	
		onChange = nextTargetKeys => {
			this.setState({
				targetKeys: nextTargetKeys
			});
		};
	
		triggerDisable = disabled => {
			this.setState({
				disabled
			});
		};
	
		triggerShowSearch = showSearch => {
			this.setState({
				showSearch
			});
		};
	
		render() {
			const { targetKeys, disabled, showSearch} = this.state;
			return (
				new Card(
					new TableTransfer()
						.dataSource(mockData)
						.targetKeys(targetKeys)
						.disabled(disabled)
						.showSearch(showSearch)
						.onChange(this.onChange)
						.filterOption((inputValue, item) => item.title.indexOf(inputValue) !== -1 || item.tag.indexOf(inputValue) !== -1)
						.leftColumns(leftTableColumns)
						.rightColumns(rightTableColumns),
					new Switch()
						.unCheckedChildren('disabled')
						.checkedChildren('disabled')
						.checked(disabled)
						.onChange(this.triggerDisable)
						.style({ marginTop: 16}),
					new Switch()
						.unCheckedChildren('showSearch')
						.checkedChildren('showSearch')
						.checked(showSearch)
						.onChange(this.triggerShowSearch)
						.style({marginTop: 16})
					)
			);
		}
	}
)



ReactDOM.render(
	new App(),
	document.getElementById('root'));