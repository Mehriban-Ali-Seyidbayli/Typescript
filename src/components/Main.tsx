import { useState } from "react";
import CustomModal from "./CustomModal";




type BoxItem = {
    id: string,
    text: string,
    diamond: boolean,
    children?: BoxItem[]
}

type ParentResult = {
    parent:BoxItem;
    index: number;
}

const treeData: BoxItem[] = [
    {
        id: "1",
        text: "category1",
        diamond: false,
        children: [
            {
                id: "2",
                text: "category1.2",
                diamond: false,
                children: [
                    {
                        id: "3",
                        text: "catregory1.2.1",
                        diamond: false,
                        children: [
                            {
                                id: '4',
                                text: 'category1.2.1.1',
                                diamond: false,
                            },
                        ],
                    },
                    {
                        id: "5",
                        text: "category5",
                        diamond: false,
                        children: [
                            {
                                id: '4',
                                text: 'category1.2.1.1',
                                diamond: false,
                            },
                        ],
                    },
                ],
            },
        ],
    },
];


const Main: React.FC = () => {
    const [schema, setSchema] = useState<BoxItem>(treeData[0]);
    const [showAddModal, setShowAddModal] = useState<boolean>(false);
    const [addId, setAddId] = useState<string>("");
    const [inputState, setInputState] = useState<string>("");

    const addItem = (id:string) => {

        const findItem = (tree:BoxItem):BoxItem | null => {
            if (tree.id === id) {
                return tree;
            } else if (tree.children) {
                for (let child of tree.children) {
                    const found = findItem(child);
                    if (found) {
                        return found;
                    }
                }
            }
            return null;
        };

        const item = findItem(schema);
        if (item) {
            item.children = item.children || [];
            item.children.push(
                {
                    id: String(new Date().getTime()),
                    text: inputState,
                    diamond: false,
                });           
           
            setSchema({ ...schema });
        }
    };

    const onConfirm = () => {
        setShowAddModal(false);
        addItem(addId);
        setInputState("");
    };


    const handleDelete = (item:BoxItem) => {

        const findParent = (tree:BoxItem, itemId:string):ParentResult | null => {
            if (tree.children) {
                for (let i = 0; i < tree.children.length; i++) {
                    if (tree.children[i].id === itemId) {
                        return {
                            parent: tree,
                            index: i,
                        };
                    } else {
                        const result = findParent(tree.children[i], itemId);
                        if (result) {
                            return result;
                        }
                    }
                }
            }
            return null;
        };

        const parent= findParent(schema, item.id);

        if (parent) {
            parent.parent.children?.splice(parent.index, 1);
            setSchema({ ...schema });
        }
    };





    const treeRendering = (treeData:BoxItem[]) => {
        return (
            <>
                <ul>
                    {treeData.map((item) => (
                        <li key={item.id} className={item.text + item.id}>

                            <div>{item.text}</div>

                            <button className="btn" onClick={() => {
                                setShowAddModal(true);
                                setAddId(item.id);
                            }}>+</button>
                            <button className="btn" onClick={() => handleDelete(item)}>x</button>


                            {item.children && item.children.length ? treeRendering(item.children) : ""}
                        </li>
                    ))}
                </ul >
            </>
        );
    };


    return (
        <>
            <div className="main">
                {treeRendering(treeData)}
            </div>

            {
                showAddModal && (
                    <CustomModal
                        inputState={inputState}
                        setInputState={setInputState}
                        setShowAddModal={setShowAddModal}
                        title="Add item"
                        onConfirm={onConfirm}
                    />
                )
            }
        </>
    )
};

export default Main;