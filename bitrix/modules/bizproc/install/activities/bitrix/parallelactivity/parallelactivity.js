////////////////////////////////////////////////////////////////////////////////////////
// ParallelActivity
////////////////////////////////////////////////////////////////////////////////////////

ParallelActivity = function()
{
	var ob = new BizProcActivity();
	ob.Type = 'ParallelActivity';
	ob.childActivities = [];
	ob.__parallelActivityInitType = 'SequenceActivity';
	ob.allowSort = false;

	function isEventWithCtrlKey(e)
	{
		return (e.ctrlKey == true || e.metaKey == true);
	}

	function swapNodes(node1, node2)
	{
		const beforeNode = node2.nextElementSibling;
		const parent = node2.parentNode;
		node1.replaceWith(node2);
		parent.insertBefore(node1, beforeNode);
	}

	ob.copyBranch = function (nCell)
	{
		ob.createBranch(ob.childActivities[nCell], nCell);
	}

	ob.addBranch = function ()
	{
		var nCell = ob.childsContainer.rows[2].cells.length-1;
		ob.createBranch(ob.__parallelActivityInitType, nCell);
	}

	ob.createBranch = function (objType, nCell)
	{
		var i;
		var c;
		var oNewBranch = CreateActivity(objType);
		oNewBranch.parentActivity = ob;

		ob.childActivities.push([]);
		for(i=ob.childActivities.length-1; i>nCell; i--)
			ob.childActivities[i] = ob.childActivities[i-1];

		ob.childActivities[nCell] = oNewBranch;

		for(i=0; i<ob.childsContainer.rows.length; i++)
		{
			c = ob.childsContainer.rows[i].insertCell(nCell);
			c.align = 'center';
			c.vAlign = 'top';
		}

		ob.DrawVLine(nCell);

		oNewBranch.Draw(ob.childsContainer.rows[2].cells[nCell]);

		ob.RefreshDelButton();
	}

	ob.delBranch = function (e)
	{
		var i = this.parentNode.parentNode.ind;
		ob.RemoveChild(ob.childActivities[i]);
	}

	ob.DrawVLine = function (i)
	{
		ob.childsContainer.rows[0].className = 'trLine';
		ob.childsContainer.rows[3].className = 'trLine';
		ob.childsContainer.rows[1].cells[i].style.background = 'url(/bitrix/images/bizproc/act_line_bg.gif) 50% top repeat-y';
		ob.childsContainer.rows[2].cells[i].style.background = 'url(/bitrix/images/bizproc/act_line_bg.gif) 50% top repeat-y';

		ob.childsContainer.rows[2].cells[i].vAlign = 'top';

		var cell = ob.childsContainer.rows[1].cells[i];
		cell.height = '20';
		cell.vAlign = 'bottom';
		//cell.align = 'center';
		var dDx = cell.appendChild(document.createElement('DIV'));
		//dDx.style.marginLeft = '14px';
		dDx.style.marginTop = '14px';
		dDx.style.display = 'none';
		var im = dDx.appendChild(document.createElement('IMG'));
		im.src="/bitrix/images/bizproc/del_br.gif";
		im.height="14";
		im.width="14";
		im.style.cursor = 'pointer';
		im.onclick = ob.delBranch;
		im.title = BPMESS['PARA_DEL'];

		if (ob.allowSort)
		{
			ob.drawMoveElement(i, cell);
		}
/*
		im.onmouseover = function ()
		{
			this.src="/bitrix/images/bizproc/parallel_del.gif";
		};

		im.onmouseout = function ()
		{
			this.src="/bitrix/images/bizproc/parallel_del_light.gif";
		};
*/
	}

	ob.RefreshDelButton = function ()
	{
		var i;
		var maxLen = ob.childActivities.length;

		for (i = 0; i < maxLen; i++)
		{
			if(ob.childActivities.length>2)
				ob.childsContainer.rows[1].cells[i].childNodes[0].style.display = 'block';
			else
				ob.childsContainer.rows[1].cells[i].childNodes[0].style.display = 'none';

			ob.childsContainer.rows[1].cells[i].ind = i;
		}
	}

	ob.OnHideClick = function ()
	{
		if(ob.Properties['_DesMinimized'] == 'Y')
		{
			ob.Properties['_DesMinimized'] = 'N';
			ob.childsContainer.style.display = 'table';
			ob.hideContainer.style.display = 'none';
		}
		else
		{
			ob.Properties['_DesMinimized'] = 'Y';
			ob.childsContainer.style.display = 'none';
			ob.hideContainer.style.display = 'block';
		}
	}

	ob.BizProcActivityDraw = ob.Draw;
	ob.Draw = function (container)
	{
		if(ob.childActivities.length == 0 )
		{
			ob.childActivities = [CreateActivity(ob.__parallelActivityInitType), CreateActivity(ob.__parallelActivityInitType)];
			ob.childActivities[0].parentActivity = ob;
			ob.childActivities[1].parentActivity = ob;
		}
		ob.container = container.appendChild(document.createElement('DIV'));
		if(!jsUtils.IsIE())
			ob.container.className = 'parallelcontainer';

		if(!ob.activityContent)
		{
			var act = _crt(1, 3);
			act.style.fontSize = '11px';
			act.rows[0].cells[0].style.background = 'url('+(ob.Icon?ob.Icon:'/bitrix/images/bizproc/act_icon.gif')+') 2px 2px no-repeat';
			act.rows[0].cells[0].style.height = '24px';
			act.rows[0].cells[0].style.width = '24px';

			act.rows[0].cells[1].align = 'left';
			act.rows[0].cells[1].innerHTML = HTMLEncode(ob['Properties']['Title']);

			act.rows[0].cells[2].style.background = 'url(/bitrix/images/bizproc/add_br.gif) left center no-repeat';
			act.rows[0].cells[2].style.width = '16px';
			act.rows[0].cells[2].style.cursor = 'pointer';
			act.rows[0].cells[2].title = BPMESS['PARA_ADD'];
			act.rows[0].cells[2].onclick = ob.addBranch;

			ob.activityContent = act;
		}

		ob.BizProcActivityDraw(ob.container);
		ob.activityContent = null;

		//ob.div.className = 'parallelcontainer';
		ob.div.style.position = 'relative';
		ob.div.style.top = '12px';

		ob.hideContainer = ob.container.appendChild(document.createElement('DIV'));
		ob.hideContainer.style.background = '#FFFFFF';
		ob.hideContainer.style.border = '1px #CCCCCC dotted';
		ob.hideContainer.style.width = '250px';
		ob.hideContainer.style.color = '#AAAAAA';
		ob.hideContainer.style.padding = '13px 0px 3px 0px';
		ob.hideContainer.style.cursor = 'pointer';
		ob.hideContainer.innerHTML = BPMESS['PARA_MIN'];
		ob.hideContainer.onclick = ob.OnHideClick;

		ob.childsContainer = ob.container.appendChild(_crt(4, ob.childActivities.length));
		//ob.childsContainer.className = 'seqactivitycontainer';
		ob.childsContainer.id = ob.Name;
		ob.childsContainer.style.background = '#FFFFFF';

		if(ob.Properties['_DesMinimized'] == 'Y')
		{
			ob.childsContainer.style.display = 'none';		
		}
		else
		{
			ob.hideContainer.style.display = 'none';
		}

		for(var i in this.childActivities)
		{
			if (!this.childActivities.hasOwnProperty(i))
				continue;
			ob.DrawVLine(i);
			ob.childActivities[i].Draw(ob.childsContainer.rows[2].cells[i]);
		}
		ob.RefreshDelButton();
	}

	ob.ActivityRemoveChild = ob.RemoveChild;
	ob.RemoveChild = function (ch)
	{
		var i, j;

		for(i = 0; i<ob.childActivities.length; i++)
		{
			if(ob.childActivities[i].Name == ch.Name)
			{
				ob.ActivityRemoveChild(ch);

				if(ob.childsContainer)
				{
					ob.childsContainer.rows[0].deleteCell(i);
					ob.childsContainer.rows[1].deleteCell(i);
					ob.childsContainer.rows[2].deleteCell(i);
					ob.childsContainer.rows[3].deleteCell(i);


					ob.RefreshDelButton();
				}

				break;
			}
		}
	}


	ob.BizProcActivityRemoveResources = ob.RemoveResources;
	ob.RemoveResources = function ()
	{
		ob.BizProcActivityRemoveResources();
		if(ob.container && ob.container.parentNode)
		{
			ob.container.parentNode.removeChild(ob.container);
			ob.container = null;
		}
	}

	ob.drawMoveElement = function (i, cell)
	{
		var dDx = cell.appendChild(document.createElement('DIV'));
		dDx.className = 'move-thread';

		var im = dDx.appendChild(document.createElement('DIV'));
		im.className="to-left";
		im.onclick = ob.moveToLeft;
		im.title = BPMESS['PARA_MOVE_LEFT'];

		var im2 = dDx.appendChild(document.createElement('DIV'));
		im2.className="to-right";
		im2.onclick = ob.moveToRight;
		im2.title = BPMESS['PARA_MOVE_RIGHT'];
	}

	ob.moveToRight = function (e)
	{
		var i = this.parentNode.parentNode.ind;

		if (i === ob.childActivities.length)
		{
			return;
		}

		if (isEventWithCtrlKey(e))
		{
			ob.copyBranch(i);
		}
		else
		{
			ob.swapBranch(i, i+1);
		}

		BPTemplateIsModified = true;

		return false;
	}

	ob.moveToLeft = function (e)
	{
		var i = this.parentNode.parentNode.ind;

		if (i === 0)
		{
			return;
		}

		if (isEventWithCtrlKey(e))
		{
			ob.copyBranch(i);
		}
		else
		{
			ob.swapBranch(i - 1, i);
		}

		BPTemplateIsModified = true;

		return false;
	}

	ob.swapBranch = function (i1, i2)
	{
		var tmp = ob.childActivities[i1];
		ob.childActivities[i1] = ob.childActivities[i2];
		ob.childActivities[i2] = tmp;

		for (var k = 1; k < 3; k++)
		{
			ob.childsContainer.rows[k].cells[i1].ind = i2;
			ob.childsContainer.rows[k].cells[i2].ind = i1;
			swapNodes(ob.childsContainer.rows[k].cells[i1], ob.childsContainer.rows[k].cells[i2]);
		}
	}

	return ob;
}