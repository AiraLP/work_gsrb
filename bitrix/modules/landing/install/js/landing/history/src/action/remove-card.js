const {scrollTo, highlight} = BX.Landing.Utils;

/**
 * @param {string} state
 * @param {object} entry
 * @return {Promise}
 */
export default function removeCard(entry)
{
	return BX.Landing.PageObject.getInstance().blocks()
		.then((blocks) => {
			const block = blocks.get(entry.block);
			block.forceInit();

			if (!block)
			{
				return Promise.reject();
			}

			const relativeSelector = entry.params.selector + '@' + (entry.params.position + 1);
			const card = block.cards.getBySelector(relativeSelector);

			if (!card)
			{
				return Promise.reject();
			}

			return scrollTo(card.node)
				.then(highlight.bind(null, card.node))
				.then(() => {
					return block.removeCard(relativeSelector, true);
				});
		});
}