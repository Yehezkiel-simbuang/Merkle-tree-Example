function verifyProof(proof, node, root, concat) {
    proof.forEach((item)=>{
        if (item.left == false){
            node = concat(node, item.data);
        }else{
            node = concat(item.data, node);
        }
    })
    if(node === root){
        return true;
    }else{
        return false;
    }
}

module.exports = verifyProof;
