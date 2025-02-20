import re
import sys

def clean_line(line):
    # Ignorer les lignes d'en-tête ou non pertinentes
    if line.startswith("Structure du dossier") or "numéro de série" in line or line.strip().startswith("C:."):
        return None
    # Remplacer les symboles d'arborescence par des espaces
    # Ici on remplace 'ª' et '¤' par un espace simple
    line = line.replace('ª', ' ').replace('¤', ' ')
    # Supprimer les marques "+---" qui indiquent le début d'un dossier/fichier
    line = line.replace('+---', '')
    # Nettoyer la ligne (supprimer espaces en fin et début)
    return line.rstrip()

def process_file(input_file, output_file):
    with open(input_file, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    cleaned_lines = []
    for line in lines:
        cleaned = clean_line(line)
        if cleaned is not None and cleaned.strip() != "":
            cleaned_lines.append(cleaned)
    
    with open(output_file, 'w', encoding='utf-8') as f:
        for line in cleaned_lines:
            f.write(line + "\n")

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python clean_tree.py input.txt output.txt")
        sys.exit(1)
    input_file = sys.argv[1]
    output_file = sys.argv[2]
    process_file(input_file, output_file)
