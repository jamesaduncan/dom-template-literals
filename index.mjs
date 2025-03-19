document.addEventListener("DOMContentLoaded", () => {
    const treeWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);

    while( treeWalker.nextNode() ) {
        const node = treeWalker.currentNode;
        if ( node.nodeType == 3 ) // plain old text nodes
            node.textContent = eval("`"+node.textContent+"`");
        else { // attributes
            for ( const attr of node.attributes ) {
                try {
                    attr.value = eval("`" + attr.value + "`");
                } catch(e) {
                    // if we can't do template literals, oh well.
                }
            }
        }
    }
});

