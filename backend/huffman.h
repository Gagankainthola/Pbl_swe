#define HUFFMAN_H
#include <unordered_map>
using namespace std;

struct Node {
    char ch;
    int freq;
    Node* left;
    Node* right;

    Node(char c, int f) {
        ch = c;
        freq = f;
        left = right = nullptr;
    }
};
class Huffman {
private:
    Node* root;
    unordered_map<char, int> frequency;
    unordered_map<char, string> huffmanCode;

    void buildFrequencyTable(string& file);
    void buildHuffmanTree();
    void generateHuffmanCodes(Node* node, string code);
    void writeEncodedFile( string& input,string& output);

public:
    Huffman();
    void compress(string& input,string& output);
};
