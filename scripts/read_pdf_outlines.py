import pypdf

def get_outlines():
    reader = pypdf.PdfReader('/Users/batman/Desktop/techfittech/Tunturi Brochure 2026-5 (2).pdf')
    outlines = reader.outline
    
    def print_outline(outline, depth=0):
        for item in outline:
            if isinstance(item, list):
                print_outline(item, depth + 1)
            else:
                title = item.title
                try:
                    page_num = reader.get_destination_page_number(item)
                    page_str = f"Page {page_num + 1}" if page_num is not None else "Unknown Page"
                except Exception as e:
                    page_str = f"Error: {e}"
                print("  " * depth + f"- {title} ({page_str})")
                
    if outlines:
        print_outline(outlines)
    else:
        print("No outlines found in the PDF.")

get_outlines()
