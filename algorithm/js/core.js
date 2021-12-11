const modules = [
	{
		name: '两数之和',
		des: `给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。

			你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。

			你可以按任意顺序返回答案。`,
		level: '简单',
		example: `输入：nums = [2,7,11,15], target = 9
			输出：[0,1]
			解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。`,
		thinking: `
		1.创建一个map
		2.for循环遍历nums数组
		3.用target减nums[i]，来计算那个数能跟当前的数字相加得到target
		4.检查map里有没有这个数，如果有则返回结果，如果没有则把nums[i]当作key，i当作value放入map中
		`,
		needArg: [
			{
				name: 'target',
				type: Number,
			},
			{
				name: 'arr',
				type: Array,
			}
		],
		fn: function (target, arr) {
			const map = new Map();
			for(let i=0;i<arr.length;i++) {
				const Difference = target - arr[i];
				if(map.has(Difference)) {
					return [map.get(Difference), i]
				} else {
					map.set(Difference, i);
				}
			}
		}
	},
	{
		name: "两数相加",
		des: `给你两个 非空 的链表，表示两个非负的整数。它们每位数字都是按照 逆序 的方式存储的，并且每个节点只能存储 一位 数字。

			请你将两个数相加，并以相同形式返回一个表示和的链表。

			你可以假设除了数字 0 之外，这两个数都不会以 0 开头。`,
		level: "中等",
		example: `输入：l1 = [2,4,3], l2 = [5,6,4]
			输出：[7,0,8]
			解释：342 + 465 = 807.`,
		thinking: `暂无`,
		needArg: [
			{
				name: 'l1',
				type: Array,
			},
			{
				name: 'l2',
				type: Array,
			}
		],
		fn: function(l1, l2) {
		    let newArr = [];
		    let longArr = l1.length > l2.length ? l1:l2;
		    let sortArr = l1.length > l2.length ? l2:l1; 

		    let wei = 0;
		    let jin = 0;
		    for(let i=0;i<=longArr.length;i++) {
		        let item1 = longArr[i] || 0;
		        let item2 = sortArr[i] || 0;
		        let sum = item1 + item2;
		        if(jin > 0) {
		            sum += jin;
		            jin = 0
		        }
		        wei = sum % 10;
		        if(sum >= 10) {
		            jin = parseInt(sum / 10)
		        }
		        newArr.push(wei);
		    }
		    if(jin > 0) {
		        newArr.push(jin)
		    }
		    return newArr
		},
	},
	{
		name: "无重复字符的最长子串",
		des: `给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。`,
		level: "中等",
		example: `输入: s = "abcabcbb"
输出: 3 
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。`,
		thinking: `
		sinding window
		1.创建一个set
		2.两个指针----第一个指向字符串的开头：j，第二个随着for循环遍历字符串
		3.如果还没有重复的字符，把s[i]添加到set里，然后更新最大不重复字符的数量。
		4.如果set里有s[i]，则从set里开始删除s[i]，并且递增j，再检查set里是否有s[i]，如此反复直到set里没有s[i]为止
		5.重复步骤3和4，直到遍历完整个字符串
		`,
		needArg: [
			{
				name: 's',
				type: String,
			}
		],
		fn: function(s) {
			const set = new Set();
			let i = 0,
				j = 0,
				maxlength = 0;
			for(let i = 0; i<s.length;i++) {
				if(!set.has(s[i]) ) {
					set.add(s[i])
					maxlength = Math.max(set.size, maxlength)
				} else {
					while(set.has(s[j])) {
						set.delete(s[j]);
						j++
					}
					set.add(s[i])
				}
			}
			return maxlength;
		},
	},
	{
		name: "最长回文子串",
		des: `给你一个字符串 s，找到 s 中最长的回文子串`,
		level: "中等",
		example: `输入：s = "babad"
输出："bab"
解释："aba" 同样是符合题意的答案。`,
		thinking: `
		1.如果字符串长度小于2，直接返回字符串
		2.定义两个变量，一个start存储当前找到的最大回文字符串的起始位置，另一个maxLength记录字符串的长度（终止位置就是start + maxLength）
		3.创建一个helper function，判断左边和右边是否越界，同时最左边的字符是否等于最右边的字符。如果以上3个条件都满足，则判断是否需要更新回文字符串最大长度以及最大字符串的起始位置，然后将left--，right++，继续判断，直到不满足三个条件之一
		4.遍历字符串，每个位置调用helper function两遍，第一遍检查i-1，第二部检查i，i+1（检查两遍的目的？两个）
		`,
		needArg: [
			{
				name: 's',
				type: String,
			}
		],
		fn: function(s) {
			if(s.length < 2) {
				return s;
			}
			let start = 0
			let maxlength = 1;
			function expandAroundCenter(left, right) {
				while(left >= 0 && right < s.length && s[left] == s[right]) {
					if(right - left + 1 > maxlength) {
						maxlength = right - left + 1;
						start = left
					}
					left--;
					right++;
				}
			}
			for(let i = 0; i < s.length; i++ ) {
				expandAroundCenter(i - 1, i + 1);
				expandAroundCenter(i, i + 1)
			}
			return s.substr(start, maxlength)
			// return s.substring(start, start+maxlength)
		},
	},
	{
		name: "15. 三数之和",
		des: `给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有和为 0 且不重复的三元组。

注意：答案中不可以包含重复的三元组。`,
		level: "中等",
		example: `示例 1：

输入：nums = [-1,0,1,2,-1,-4]
输出：[[-1,-1,2],[-1,0,1]]
示例 2：

输入：nums = []
输出：[]
示例 3：

输入：nums = [0]
输出：[]`,
		thinking: `
		1.给数组排序
		2.遍历数组，从0遍历到length-2（为什么？）
		3.如果当前的数字等于前一个数字，则跳过这个数（为什么？）
		4.如果数字不同，则设置start = i + 1, end = length - 1, 查看i，start和end三个数的和比0大还是小，比0小，start++，比0大，end--，如果等于0，把这三个数加入到结果里
		5.返回结果`,
		needArg: [
			{
				name: 'nums',
				type: Array,
			}
		],
		fn: function(nums) {
			const result = [];
			nums.sort(function(a,b) {
				return a - b;
			})
			for(let i = 0; i< nums.length;i++) {
				if(i == 0 || nums[i] !== nums[i - 1]) {
					let start = i + 1, end = nums.length - 1;
					while(start < end) {
						if(nums[i] + nums[start] + nums[end] == 0) {
							result.push(nums[i], nums[start], nums[end]);
							start++;
							end--;
							// 这里是为了防止相邻重复
							while(start < end && nums[start] == nums[start - 1]) {
								start++
							}
							while(start < end && nums[end] == nums[end - 1]) {
								end--
							}
						} else if(nums[i] + nums[start] + nums[end] < 0) {
							start++;
						} else {
							end--;
						}
					}
				}
			}
			return result;
		},
	},
	{
		name: "20. 有效的括号",
		des: `给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。

有效字符串需满足：

左括号必须用相同类型的右括号闭合。
左括号必须以正确的顺序闭合。`,
		level: "简单",
		example: `示例 4：

输入：s = "([)]"
输出：false
示例 5：

输入：s = "{[]}"
输出：true`,
		thinking: `
		用栈的方式
		1.创建一个HashMap，把括号配对放进去
		2.创建一个stack（object），for循环遍历字符串，对于每一个字符，如果map里有这个key，那说明它是个左括号，从map里取得相对应的右括号（为什么？）把它push进stack里。否则的话，它就是右括号，需要pop出stack里的第一个字符然后看它是否等于当前的字符。如果不相等，则返回false
		3.循环结束后，如果stack不为空，说明还剩一些左括号没有闭合，返回false。否则返回true`,
		needArg: [
			{
				name: 's',
				type: String,
			}
		],
		fn: function(s) {
			const mappings = new Map([["{","}"],["(",")"],["[","]"]]);
			const stack = []
			for(let i=0;i<s.length;i++) {
				if(mappings.has(s[i])) {
					stack.push(mappings.get(s[i]))
				} else {
					if(stack.pop() !== s[i]) {
						return false;
					}
				}
			}
			if(stack.length !== 0) {
				return false;
			}
			return true;
		},
	},
	{
		name: "49. 字母异位词分组",
		des: `给你一个字符串数组，请你将 字母异位词 组合在一起。可以按任意顺序返回结果列表。

字母异位词 是由重新排列源单词的字母得到的一个新单词，所有源单词中的字母通常恰好只用一次。`,
		level: "中等",
		example: `示例 1:

输入: strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
输出: [["bat"],["nat","tan"],["ate","eat","tea"]]
示例 2:

输入: strs = [""]
输出: [[""]]
示例 3:

输入: strs = ["a"]
输出: [["a"]]

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/group-anagrams
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。`,
		thinking: `
		1.检查是否为空数组
		2.建立一个长度为26的数组，起始值为0
		3.遍历所有字符串，将字母的出现频率放到数组的对应位置里（利用ascii码）
		4.遍历数组，按照相同字母出现频率进行分组归类（使用hashMap）
		5.遍历map，将结果返回`,
		needArg: [
			{
				name: 'strs',
				type: Array,
			}
		],
		fn: function(strs) {
			if(strs.lenght == 0) {
				return [];
			} 
			const map = new Map();
			for(const str of strs) {
				const characters = Array(26).fill(0);
				for(let i=0;i<str.length;i++) {
					const ascii = str.charCodeAt(i) - 97;
					characters[ascii]++
				}
				const key = characters.join("");
				if(map.has(key)) {
					map.get(key).unshift(str)
					map.set(key, map.get(key))
					// map.set(key, [...map.get(key), str])

				} else {
					map.set(key, [str])
				}
			}

			const result = [];
			for(const arr of map) {
				result.unshift(arr[1])
			}
			return result;
		},
	},
	{
		name: "暂无",
		des: `暂无`,
		level: "暂无",
		example: `暂无`,
		thinking: `暂无`,
		needArg: [
			{
				name: 'arg',
				type: String,
			}
		],
		fn: function() {},
	},
	{
		name: "暂无",
		des: `暂无`,
		level: "暂无",
		example: `暂无`,
		thinking: `暂无`,
		needArg: [
			{
				name: 'arg',
				type: String,
			}
		],
		fn: function() {},
	},
	/*{
		name: "暂无",
		des: `暂无`,
		level: "暂无",
		example: `暂无`,
		thinking: `暂无`,
		needArg: [
			{
				name: 'arg',
				type: String,
			}
		],
		fn: function() {},
	},*/
]