const fs = require("fs");
const path = require("path");

/**
 * @param {string} file name
 * @param {Array} files in directory
 * @returns {boolean} is compiled or not
 */
function isCompiledFile(file, files) {
    let file_no_suffix = file.substring(0, file.lastIndexOf("."));
    let file_no_suffix_again = file_no_suffix.substring(0, file_no_suffix.lastIndexOf("."));

    /**
     * TypeScript filter
     */
    if (
        file.endsWith(".d.ts") ||
        file.endsWith(".d.ts.map") ||
        file.endsWith(".js.map") ||
        (file.endsWith(".js") &&
            files.includes(`${file}.map`) &&
            files.includes(`${file_no_suffix}.d.ts`) &&
            files.includes(`${file_no_suffix}.d.ts.map`))
    ) {
        return true;
    }

    /**
     * SCSS filter
     */
    if (
        (file.endsWith(".css") &&
            (files.includes(`${file_no_suffix}.scss`) || files.includes(`_${file_no_suffix}.scss`))) ||
        (file.endsWith(".css.map") &&
            (files.includes(`${file_no_suffix_again}.scss`) || files.includes(`_${file_no_suffix_again}.scss`)))
    ) {
        return true;
    }

    return false;
}

/**
 * @param {Array} source to target
 * @returns {void}
 */
async function clean(source = []) {
    let clean_items = await fs.promises.readdir(path.join(...source));

    for (let index = 0; index < clean_items.length; index += 1) {
        let clean_item_path = path.join(...source.concat(clean_items[index]));
        let clean_item_stats = await fs.promises.stat(clean_item_path);
        if (clean_item_stats.isDirectory()) {
            await clean(source.concat(clean_items[index]));
        }
        if (clean_item_stats.isFile() && isCompiledFile(clean_items[index], clean_items)) {
            await fs.promises.unlink(clean_item_path);
        }
    }
}

clean([__dirname, "dist", "src"]);
