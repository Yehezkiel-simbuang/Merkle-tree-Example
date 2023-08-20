class MerkleTree {
    constructor(leaves, concat) {
        this.leaves = leaves;
        this.concat = concat;
    }
    getRoot() {
        return this.getRootHash(this.leaves);
    }

    getRootHash(treeArr){
        let arr = [];
        if(treeArr.length == 1){
            return treeArr[0];
        }else{
            for(let i=0;i<treeArr.length;i++){
                if(i%2 != 0){
                    arr.push(this.concat(treeArr[i-1], treeArr[i]));
                }
            }
            if (treeArr.length % 2 != 0){
                arr.push(treeArr.slice(-1));
            }
            return this.getRootHash(arr);
        }

    }
    getProof(idx, arr=this.leaves, proofArr=[]){
        if (arr.length == 1) return proofArr;
        let newArr = [];
        for(let i=0;i<arr.length;i++){
            if(i%2 != 0){
                newArr.push(this.concat(arr[i-1], arr[i]));
            }  
        }
        if (arr.length % 2 != 0){
            newArr.push(arr.slice(-1)[0]);
        }
        if(arr.length % 2 !== 0 && idx == (arr.length - 1)) {
            return this.getProof(Math.floor(idx / 2), newArr, proofArr)
        }
        proofArr.push({'data':(idx % 2 === 0)?arr[idx+1]:arr[idx-1],
        'left':!(idx % 2===0)});

        return this.getProof(Math.floor(idx / 2), newArr, proofArr);
    }
}

module.exports = MerkleTree;