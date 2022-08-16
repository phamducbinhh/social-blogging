<!--Truy xuat du lieu voi firebase

    useEffect(() => {
        const colRef = collection(db,"posts")
         onSnapshot(colRef, (snapshot) => {
        let result = [];
        snapshot.forEach((item) => {
            result.push({
                id: item.id,
                 ...item.data(),
            });
        });
    });
    },[])

 -->

 <!-- add du lieu vao firebase
    
    const handleAddDoc = async (values) => {
        const colRef = collection(db,"posts")
        await addDoc(colRef,{
            title:"",
            author:"",
        })
    }
  -->

<!-- xoa du lieu trong firebase
    const handleDelete = async(values) => {
         const colRef = doc(db, "posts", id);
        await deleteDoc(colRef);
    }
 -->

<!-- Map data ra Ui
    const [state,setState] = useState([])

        useEffect(() => {
        const colRef = collection(db,"posts")
            onSnapshot(colRef, (snapshot) => {
            let result = [];
            snapshot.forEach((item) => {
                result.push({
                    id: item.id,
                    ...item.data(),
                });
            });
                setPostNew(result);
         });
    },[])

    **sau do map state de render ra giao dien

 -->

<!-- Update du lieu trong firebase voi update doc

    const handleUpdatePost = async(values) => {
         const colRef = doc(db, "posts", id);
         await updateDoc(colRef,{
            title:"",
            author:"",
         })
    }

 -->

<!-- lay toan bo thong tin cua 1 bai viet (fetching single document)

    const [singlePost,setSinglePost] = useState([])

    const docRef = doc(db,"posts",id)
    onSnapshot(docRef,(doc) => {
        console.log(doc.id,doc.data())
    })

 -->

<!-- truy van du lieu nang cao bang query

    const colRef = collection(db, "posts");
    const q = query(
      colRef,
      where("status", "==", 1),
    );
    onSnapshot(q, (snapshot) => {
      let result = [];
      snapshot.forEach((item) => {
        result.push({
          id: item.id,
          ...item.data(),
        });
      });
    });

 -->
