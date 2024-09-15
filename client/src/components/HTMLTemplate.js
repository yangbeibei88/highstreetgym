export const rowHtml = (field, value) =>
  `<td data-cell=${field} class='grid grid-cols-2 before:content-[attr(data-cell)] before:uppercase before:font-semibold md:text-center md:table-cell md:before:content-none'>${value}</td>`;

export const linkHtml = (text, path) => `
        <a href="${path}" class="text-sm text-darkCyan underline underline-offset-2 decoration-dotted hover:brightness-125 hover:decoration-solid">
      ${text}
    </a>
    `;
