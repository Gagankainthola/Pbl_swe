#include "huffman.h"
#include<bits/stdc++.h>
using namespace std;
int main(char* argv[]) {
    string inputFilePath = argv[1];
    string outputFilePath = argv[2];

    Huffman huffman;
    huffman.compress(inputFilePath, outputFilePath);
    cout << "Compression completed successfully.\n";
}
