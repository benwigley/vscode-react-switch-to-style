import * as vscode from 'vscode';

const debug = false;

async function findFileInWorkspace(suffix: string, folders: Array<string>, filenameWithoutExtension: string) {
  const file = ['**', ...folders, `${filenameWithoutExtension}${suffix}`].join('/');
  if (debug) console.debug('Search file: ', file);
  const files = await vscode.workspace.findFiles(file, '**/node_modules/**')
  if (files.length === 0 && folders.length > 0) {
    return await findFileInWorkspace(suffix, folders.slice(1), filenameWithoutExtension);
  } else if(files.length > 0) {
    vscode.workspace
      .openTextDocument(vscode.Uri.file(files[0].path))
      .then(vscode.window.showTextDocument);
    if (debug) console.debug('File found:', file);
    return true;
  }
  return false;
}

async function reactSwitchToStyleCommand() {
  if (debug) console.debug('command.reactSwitchToStyle')
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    return;
  }

  const workspace = vscode.workspace.getWorkspaceFolder(editor.document.uri);
  if (!workspace) {
    return;
  }

  const relativePath = editor.document.fileName.slice(workspace.uri.path.length + 1);
  const parsedPath = relativePath.match(/(.*)\/([^/]+)(\.\w+)$/);
  if (!parsedPath || parsedPath.length !== 4) {
    return;
  }
  const [, relativeFolderPath, filenameWithoutExtension, untrimmedFilenameExtension] = parsedPath;
  const filenameExtension = untrimmedFilenameExtension.trim();
  const styleSuffixes = ['.scss', '.styl', '.css', '.scss', '.less'];
  const codeSuffixes = ['.jsx', '.js', '.tsx', '.ts', '.html', '.erb'];

  if (styleSuffixes.includes(filenameExtension)) {
    if (debug) console.debug('In a Style file. Searching for a Code file.')
    for (const suffix of codeSuffixes) {
      if (await findFileInWorkspace(suffix, relativeFolderPath.split('/'), filenameWithoutExtension)) {
        break
      }
    }
    return
  }

  if (debug) console.debug('In a Code file. Searching for a Style file.')
  for (const suffix of styleSuffixes) {
    if (await findFileInWorkspace(suffix, relativeFolderPath.split('/'), filenameWithoutExtension)) {
      break
    }
  }
}

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand('extension.reactSwitchToStyle', reactSwitchToStyleCommand);
  context.subscriptions.push(disposable);
}

export function deactivate() { }
