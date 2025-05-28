const { Heap } = require('heap-js');

class Node {
    constructor(pixel, freq) {
        this.pixel = pixel;
        this.freq = freq;
        this.left = null;
        this.right = null;
    }
}

//build huffman tree

function generate_huffman_codes(root, code = '', codeMap = {}) {
    if (!root) return;  
    if (root.pixel !== null) codeMap[root.pixel] = code;

    generate_huffman_codes(root.left, code + '0', codeMap);
    generate_huffman_codes(root.right, code + '1', codeMap);

    return codeMap;
}

function encode_image(pixels, codeMap) {
    return pixels.map(pixel => codeMap[pixel]).join("");
}

//encoding part

function decode_image(encoded, root) {
    let decoded = [];
    let node = root;

    for (let bit of encoded) {
        node = bit === '0' ? node.left : node.right;
        if (node.pixel !== null) {
            decoded.push(node.pixel);
            node = root;
        }
    }

    return decoded;
}

module.exports = { build_huffman_tree, generate_huffman_codes, encode_image, decode_image };
