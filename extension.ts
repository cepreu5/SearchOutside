import * as vscode from 'vscode';

let lastMatchLine = -1;
let lastSearchTerm = "";

function findNextMatch(text: string, term: string): number | null {
    const lines = text.split('\n');
    const total = lines.length;
    let insideBlock = false;

    for (let offset = 1; offset <= total; offset++) {
        const i = (lastMatchLine + offset) % total;
        let line = lines[i];

        if (insideBlock) {
            if (line.includes('*/')) insideBlock = false;
            continue;
        }

        if (line.includes('/*')) {
            insideBlock = true;
            continue;
        }

        const codeOnly = line.split('//')[0];
        if (codeOnly.includes(term)) {
            lastMatchLine = i;
            return i;
        }
    }

    return null;
}

export function activate(context: vscode.ExtensionContext) {
    const disposable = vscode.commands.registerCommand('smart-find.nextOutsideComment', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) return;

        const document = editor.document;
        const text = document.getText();

        const term = await vscode.window.showInputBox({
            prompt: 'Търси термин извън коментари (/* */ и //)',
            value: lastSearchTerm
        });

        if (!term) return;
        lastSearchTerm = term;

        const line = findNextMatch(text, term);
        if (line !== null) {
            const pos = new vscode.Position(line, 0);
            editor.selection = new vscode.Selection(pos, pos);
            editor.revealRange(new vscode.Range(pos, pos), vscode.TextEditorRevealType.InCenter);
            vscode.window.setStatusBarMessage(`✔️ Ред ${line + 1}: ${term}`, 2500);
        } else {
            vscode.window.showInformationMessage('❌ Няма други съвпадения извън коментари.');
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
