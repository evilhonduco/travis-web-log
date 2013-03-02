(function() {

  describe('Log.Dom', function() {
    var strip;
    strip = function(string) {
      return string.replace(/^\s+/gm, '').replace(/<a><\/a>/gm, '').replace(/\n/gm, '');
    };
    beforeEach(function() {
      while (log.firstChild) {
        log.removeChild(log.firstChild);
      }
      this.log = new Log(Log.Dom);
      this.log.listeners.push(new Log.FragmentRenderer);
      return this.render = function(data) {
        var line, num, string, _i, _j, _len, _len1, _ref, _ref1;
        try {
          for (_i = 0, _len = data.length; _i < _len; _i++) {
            _ref = data[_i], num = _ref[0], string = _ref[1];
            this.log.set(num, string);
          }
        } catch (e) {
          _ref1 = e.stack.split("\n");
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            line = _ref1[_j];
            console.log(line);
          }
        }
        return strip(document.firstChild.innerHTML);
      };
    });
    describe('lines', function() {
      var HTML;
      HTML = strip('<p><span id="0-0-0">foo</span></p>\n<p><span id="1-0-0">bar</span></p>\n<p><span id="2-0-0">baz</span></p>');
      it('ordered', function() {
        return expect(this.render([[0, 'foo\n'], [1, 'bar\n'], [2, 'baz\n']])).toBe(HTML);
      });
      it('unordered (1)', function() {
        return expect(this.render([[0, 'foo\n'], [2, 'baz\n'], [1, 'bar\n']])).toBe(HTML);
      });
      it('unordered (2)', function() {
        return expect(this.render([[1, 'bar\n'], [0, 'foo\n'], [2, 'baz\n']])).toBe(HTML);
      });
      it('unordered (3)', function() {
        return expect(this.render([[1, 'bar\n'], [2, 'baz\n'], [0, 'foo\n']])).toBe(HTML);
      });
      it('unordered (4)', function() {
        return expect(this.render([[2, 'baz\n'], [0, 'foo\n'], [1, 'bar\n']])).toBe(HTML);
      });
      return it('unordered (5)', function() {
        return expect(this.render([[2, 'baz\n'], [1, 'bar\n'], [0, 'foo\n']])).toBe(HTML);
      });
    });
    describe('unterminated chunks', function() {
      it('ordered', function() {
        var html;
        html = '<p><span id="0-0-0">.</span><span id="1-0-0">.</span><span id="2-0-0">.</span></p>';
        return expect(this.render([[0, '.'], [1, '.'], [2, '.']])).toBe(html);
      });
      it('unordered (1)', function() {
        var html;
        html = '<p><span id="0-0-0">.</span><span id="1-0-0">.</span><span id="2-0-0">.</span></p>';
        return expect(this.render([[0, '.'], [2, '.'], [1, '.']])).toBe(html);
      });
      it('unordered (2)', function() {
        var html;
        html = '<p><span id="0-0-0">.</span><span id="1-0-0">.</span><span id="2-0-0">.</span></p>';
        return expect(this.render([[1, '.'], [0, '.'], [2, '.']])).toBe(html);
      });
      it('unordered (3)', function() {
        var html;
        html = '<p><span id="0-0-0">.</span><span id="1-0-0">.</span><span id="2-0-0">.</span></p>';
        return expect(this.render([[1, '.'], [2, '.'], [0, '.']])).toBe(html);
      });
      it('unordered (4)', function() {
        var html;
        html = '<p><span id="0-0-0">.</span><span id="1-0-0">.</span><span id="2-0-0">.</span></p>';
        return expect(this.render([[2, '.'], [1, '.'], [0, '.']])).toBe(html);
      });
      return it('unordered (5)', function() {
        var html;
        html = '<p><span id="0-0-0">.</span><span id="1-0-0">.</span><span id="2-0-0">.</span></p>';
        return expect(this.render([[2, '.'], [0, '.'], [1, '.']])).toBe(html);
      });
    });
    describe('simulating test dot output (10 parts, incomplete permutations)', function() {
      it('ordered', function() {
        var data, html;
        data = [[0, 'foo\n'], [1, 'bar\n'], [2, '.'], [3, '.'], [4, '.\n'], [5, 'baz\n'], [6, 'buz\n'], [7, '.'], [8, '.'], [9, '.']];
        html = strip('<p><span id="0-0-0">foo</span></p><p><span id="1-0-0">bar</span></p>\n<p><span id="2-0-0">.</span><span id="3-0-0">.</span><span id="4-0-0">.</span></p>\n<p><span id="5-0-0">baz</span></p><p><span id="6-0-0">buz</span></p>\n<p><span id="7-0-0">.</span><span id="8-0-0">.</span><span id="9-0-0">.</span></p>');
        return expect(this.render(data)).toBe(html);
      });
      it('unordered (1)', function() {
        var data, html;
        data = [[0, 'foo\n'], [2, '.'], [1, 'bar\n'], [4, '.\n'], [3, '.'], [6, 'buz\n'], [5, 'baz\n'], [8, '.'], [7, '.'], [9, '.']];
        html = strip('<p><span id="0-0-0">foo</span></p><p><span id="1-0-0">bar</span></p>\n<p><span id="2-0-0">.</span><span id="3-0-0">.</span><span id="4-0-0">.</span></p>\n<p><span id="5-0-0">baz</span></p><p><span id="6-0-0">buz</span></p>\n<p><span id="7-0-0">.</span><span id="8-0-0">.</span><span id="9-0-0">.</span></p>');
        return expect(this.render(data)).toBe(html);
      });
      it('unordered (2)', function() {
        var data, html;
        data = [[0, 'foo\n'], [3, '.'], [1, 'bar\n'], [5, 'baz\n'], [2, '.'], [7, '.'], [4, '.\n'], [6, 'buz\n'], [9, '.'], [8, '.']];
        html = strip('<p><span id="0-0-0">foo</span></p><p><span id="1-0-0">bar</span></p>\n<p><span id="2-0-0">.</span><span id="3-0-0">.</span><span id="4-0-0">.</span></p>\n<p><span id="5-0-0">baz</span></p><p><span id="6-0-0">buz</span></p>\n<p><span id="7-0-0">.</span><span id="8-0-0">.</span><span id="9-0-0">.</span></p>');
        return expect(this.render(data)).toBe(html);
      });
      it('unordered (3)', function() {
        var data, html;
        data = [[7, '.'], [9, '.'], [4, '.\n'], [8, '.'], [6, 'buz\n'], [2, '.'], [5, 'baz\n'], [0, 'foo\n'], [3, '.'], [1, 'bar\n']];
        html = strip('<p><span id="0-0-0">foo</span></p><p><span id="1-0-0">bar</span></p>\n<p><span id="2-0-0">.</span><span id="3-0-0">.</span><span id="4-0-0">.</span></p>\n<p><span id="5-0-0">baz</span></p><p><span id="6-0-0">buz</span></p>\n<p><span id="7-0-0">.</span><span id="8-0-0">.</span><span id="9-0-0">.</span></p>');
        return expect(this.render(data)).toBe(html);
      });
      return it('unordered (4)', function() {
        var data, html;
        data = [[9, '.'], [8, '.'], [7, '.'], [6, 'buz\n'], [5, 'baz\n'], [4, '.\n'], [3, '.'], [2, '.'], [1, 'bar\n'], [0, 'foo\n']];
        html = strip('<p><span id="0-0-0">foo</span></p><p><span id="1-0-0">bar</span></p>\n<p><span id="2-0-0">.</span><span id="3-0-0">.</span><span id="4-0-0">.</span></p>\n<p><span id="5-0-0">baz</span></p><p><span id="6-0-0">buz</span></p>\n<p><span id="7-0-0">.</span><span id="8-0-0">.</span><span id="9-0-0">.</span></p>');
        return expect(this.render(data)).toBe(html);
      });
    });
    return describe('simulating test dot output (5 parts, complete permutations)', function() {
      beforeEach(function() {
        return this.html = {
          1: strip('<p><span id="0-0-0">foo</span></p>\n<p><span id="1-0-0">.</span><span id="2-0-0">.</span><span id="3-0-0">.</span></p>\n<p><span id="4-0-0">bar</span></p>'),
          2: strip('<p><span id="0-0-0">foo</span></p>\n<p><span id="1-0-0">.</span><span id="2-0-0">.</span><span id="3-0-0">.</span></p>\n<p><span id="4-0-0">bar</span></p>'),
          3: strip('<p><span id="0-0-0">foo</span></p>\n<p><span id="1-0-0">.</span><span id="2-0-0">.</span><span id="3-0-0">.</span></p>\n<p><span id="4-0-0">bar</span></p>')
        };
      });
      it('ordered', function() {
        return expect(this.render([[0, 'foo\n'], [1, '.'], [2, '.'], [3, '.\n'], [4, 'bar\n']])).toBe(this.html[1]);
      });
      it('unordered (1)', function() {
        return expect(this.render([[0, 'foo\n'], [1, '.'], [2, '.'], [4, 'bar\n'], [3, '.\n']])).toBe(this.html[3]);
      });
      it('unordered (2)', function() {
        return expect(this.render([[0, 'foo\n'], [1, '.'], [3, '.\n'], [2, '.'], [4, 'bar\n']])).toBe(this.html[1]);
      });
      it('unordered (3)', function() {
        return expect(this.render([[0, 'foo\n'], [1, '.'], [3, '.\n'], [4, 'bar\n'], [2, '.']])).toBe(this.html[1]);
      });
      it('unordered (4)', function() {
        return expect(this.render([[0, 'foo\n'], [1, '.'], [4, 'bar\n'], [2, '.'], [3, '.\n']])).toBe(this.html[3]);
      });
      it('unordered (4)', function() {
        return expect(this.render([[0, 'foo\n'], [1, '.'], [4, 'bar\n'], [3, '.\n'], [2, '.']])).toBe(this.html[3]);
      });
      it('unordered (5)', function() {
        return expect(this.render([[0, 'foo\n'], [2, '.'], [1, '.'], [3, '.\n'], [4, 'bar\n']])).toBe(this.html[2]);
      });
      it('unordered (6)', function() {
        return expect(this.render([[0, 'foo\n'], [2, '.'], [1, '.'], [4, 'bar\n'], [3, '.\n']])).toBe(this.html[3]);
      });
      it('unordered (7)', function() {
        return expect(this.render([[0, 'foo\n'], [2, '.'], [3, '.\n'], [1, '.'], [4, 'bar\n']])).toBe(this.html[2]);
      });
      it('unordered (8)', function() {
        return expect(this.render([[0, 'foo\n'], [2, '.'], [3, '.\n'], [4, 'bar\n'], [1, '.']])).toBe(this.html[2]);
      });
      it('unordered (9)', function() {
        return expect(this.render([[0, 'foo\n'], [2, '.'], [4, 'bar\n'], [1, '.'], [3, '.\n']])).toBe(this.html[3]);
      });
      it('unordered (10)', function() {
        return expect(this.render([[0, 'foo\n'], [2, '.'], [4, 'bar\n'], [3, '.\n'], [1, '.']])).toBe(this.html[3]);
      });
      it('unordered (11)', function() {
        return expect(this.render([[0, 'foo\n'], [3, '.\n'], [1, '.'], [2, '.'], [4, 'bar\n']])).toBe(this.html[3]);
      });
      it('unordered (12)', function() {
        return expect(this.render([[0, 'foo\n'], [3, '.\n'], [1, '.'], [4, 'bar\n'], [2, '.']])).toBe(this.html[3]);
      });
      it('unordered (13)', function() {
        return expect(this.render([[0, 'foo\n'], [3, '.\n'], [2, '.'], [1, '.'], [4, 'bar\n']])).toBe(this.html[3]);
      });
      it('unordered (14)', function() {
        return expect(this.render([[0, 'foo\n'], [3, '.\n'], [2, '.'], [4, 'bar\n'], [1, '.']])).toBe(this.html[3]);
      });
      it('unordered (15)', function() {
        return expect(this.render([[0, 'foo\n'], [3, '.\n'], [4, 'bar\n'], [1, '.'], [2, '.']])).toBe(this.html[3]);
      });
      it('unordered (16)', function() {
        return expect(this.render([[0, 'foo\n'], [3, '.\n'], [4, 'bar\n'], [2, '.'], [1, '.']])).toBe(this.html[3]);
      });
      it('unordered (18)', function() {
        return expect(this.render([[0, 'foo\n'], [4, 'bar\n'], [1, '.'], [2, '.'], [3, '.\n']])).toBe(this.html[3]);
      });
      it('unordered (19)', function() {
        return expect(this.render([[0, 'foo\n'], [4, 'bar\n'], [1, '.'], [3, '.\n'], [2, '.']])).toBe(this.html[3]);
      });
      it('unordered (20)', function() {
        return expect(this.render([[0, 'foo\n'], [4, 'bar\n'], [2, '.'], [1, '.'], [3, '.\n']])).toBe(this.html[3]);
      });
      it('unordered (21)', function() {
        return expect(this.render([[0, 'foo\n'], [4, 'bar\n'], [2, '.'], [3, '.\n'], [1, '.']])).toBe(this.html[3]);
      });
      it('unordered (22)', function() {
        return expect(this.render([[0, 'foo\n'], [4, 'bar\n'], [3, '.\n'], [1, '.'], [2, '.']])).toBe(this.html[3]);
      });
      it('unordered (23)', function() {
        return expect(this.render([[0, 'foo\n'], [4, 'bar\n'], [3, '.\n'], [2, '.'], [1, '.']])).toBe(this.html[3]);
      });
      it('unordered (24)', function() {
        return expect(this.render([[1, '.'], [0, 'foo\n'], [2, '.'], [3, '.\n'], [4, 'bar\n']])).toBe(this.html[1]);
      });
      it('unordered (25)', function() {
        return expect(this.render([[1, '.'], [0, 'foo\n'], [2, '.'], [4, 'bar\n'], [3, '.\n']])).toBe(this.html[3]);
      });
      it('unordered (26)', function() {
        return expect(this.render([[1, '.'], [0, 'foo\n'], [3, '.\n'], [2, '.'], [4, 'bar\n']])).toBe(this.html[1]);
      });
      it('unordered (27)', function() {
        return expect(this.render([[1, '.'], [0, 'foo\n'], [3, '.\n'], [4, 'bar\n'], [2, '.']])).toBe(this.html[1]);
      });
      it('unordered (28)', function() {
        return expect(this.render([[1, '.'], [0, 'foo\n'], [4, 'bar\n'], [2, '.'], [3, '.\n']])).toBe(this.html[3]);
      });
      it('unordered (29)', function() {
        return expect(this.render([[1, '.'], [0, 'foo\n'], [4, 'bar\n'], [3, '.\n'], [2, '.']])).toBe(this.html[3]);
      });
      it('unordered (30)', function() {
        return expect(this.render([[1, '.'], [2, '.'], [0, 'foo\n'], [3, '.\n'], [4, 'bar\n']])).toBe(this.html[1]);
      });
      it('unordered (31)', function() {
        return expect(this.render([[1, '.'], [2, '.'], [0, 'foo\n'], [4, 'bar\n'], [3, '.\n']])).toBe(this.html[3]);
      });
      it('unordered (32)', function() {
        return expect(this.render([[1, '.'], [2, '.'], [3, '.\n'], [0, 'foo\n'], [4, 'bar\n']])).toBe(this.html[1]);
      });
      it('unordered (33)', function() {
        return expect(this.render([[1, '.'], [2, '.'], [3, '.\n'], [4, 'bar\n'], [0, 'foo\n']])).toBe(this.html[1]);
      });
      it('unordered (34)', function() {
        return expect(this.render([[1, '.'], [2, '.'], [4, 'bar\n'], [0, 'foo\n'], [3, '.\n']])).toBe(this.html[3]);
      });
      it('unordered (35)', function() {
        return expect(this.render([[1, '.'], [2, '.'], [4, 'bar\n'], [3, '.\n'], [0, 'foo\n']])).toBe(this.html[3]);
      });
      it('unordered (36)', function() {
        return expect(this.render([[1, '.'], [3, '.\n'], [0, 'foo\n'], [2, '.'], [4, 'bar\n']])).toBe(this.html[1]);
      });
      it('unordered (37)', function() {
        return expect(this.render([[1, '.'], [3, '.\n'], [0, 'foo\n'], [4, 'bar\n'], [2, '.']])).toBe(this.html[1]);
      });
      it('unordered (38)', function() {
        return expect(this.render([[1, '.'], [3, '.\n'], [2, '.'], [0, 'foo\n'], [4, 'bar\n']])).toBe(this.html[1]);
      });
      it('unordered (39)', function() {
        return expect(this.render([[1, '.'], [3, '.\n'], [2, '.'], [4, 'bar\n'], [0, 'foo\n']])).toBe(this.html[1]);
      });
      it('unordered (40)', function() {
        return expect(this.render([[1, '.'], [3, '.\n'], [4, 'bar\n'], [0, 'foo\n'], [2, '.']])).toBe(this.html[1]);
      });
      it('unordered (41)', function() {
        return expect(this.render([[1, '.'], [3, '.\n'], [4, 'bar\n'], [2, '.'], [0, 'foo\n']])).toBe(this.html[1]);
      });
      it('unordered (42)', function() {
        return expect(this.render([[1, '.'], [4, 'bar\n'], [0, 'foo\n'], [2, '.'], [3, '.\n']])).toBe(this.html[3]);
      });
      it('unordered (43)', function() {
        return expect(this.render([[1, '.'], [4, 'bar\n'], [0, 'foo\n'], [3, '.\n'], [2, '.']])).toBe(this.html[3]);
      });
      it('unordered (44)', function() {
        return expect(this.render([[1, '.'], [4, 'bar\n'], [2, '.'], [0, 'foo\n'], [3, '.\n']])).toBe(this.html[3]);
      });
      it('unordered (45)', function() {
        return expect(this.render([[1, '.'], [4, 'bar\n'], [2, '.'], [3, '.\n'], [0, 'foo\n']])).toBe(this.html[3]);
      });
      it('unordered (46)', function() {
        return expect(this.render([[1, '.'], [4, 'bar\n'], [3, '.\n'], [0, 'foo\n'], [2, '.']])).toBe(this.html[3]);
      });
      it('unordered (47)', function() {
        return expect(this.render([[1, '.'], [4, 'bar\n'], [3, '.\n'], [2, '.'], [0, 'foo\n']])).toBe(this.html[3]);
      });
      it('unordered (48)', function() {
        return expect(this.render([[2, '.'], [0, 'foo\n'], [1, '.'], [3, '.\n'], [4, 'bar\n']])).toBe(this.html[2]);
      });
      it('unordered (49)', function() {
        return expect(this.render([[2, '.'], [0, 'foo\n'], [1, '.'], [4, 'bar\n'], [3, '.\n']])).toBe(this.html[3]);
      });
      it('unordered (50)', function() {
        return expect(this.render([[2, '.'], [0, 'foo\n'], [3, '.\n'], [1, '.'], [4, 'bar\n']])).toBe(this.html[2]);
      });
      it('unordered (51)', function() {
        return expect(this.render([[2, '.'], [0, 'foo\n'], [3, '.\n'], [4, 'bar\n'], [1, '.']])).toBe(this.html[2]);
      });
      it('unordered (52)', function() {
        return expect(this.render([[2, '.'], [0, 'foo\n'], [1, '.'], [4, 'bar\n'], [3, '.\n']])).toBe(this.html[3]);
      });
      it('unordered (53)', function() {
        return expect(this.render([[2, '.'], [0, 'foo\n'], [1, '.'], [3, '.\n'], [4, 'bar\n']])).toBe(this.html[2]);
      });
      it('unordered (54)', function() {
        return expect(this.render([[2, '.'], [1, '.'], [0, 'foo\n'], [3, '.\n'], [4, 'bar\n']])).toBe(this.html[2]);
      });
      it('unordered (55)', function() {
        return expect(this.render([[2, '.'], [1, '.'], [0, 'foo\n'], [4, 'bar\n'], [3, '.\n']])).toBe(this.html[3]);
      });
      it('unordered (56)', function() {
        return expect(this.render([[2, '.'], [1, '.'], [3, '.\n'], [0, 'foo\n'], [4, 'bar\n']])).toBe(this.html[2]);
      });
      it('unordered (57)', function() {
        return expect(this.render([[2, '.'], [1, '.'], [3, '.\n'], [4, 'bar\n'], [0, 'foo\n']])).toBe(this.html[2]);
      });
      it('unordered (58)', function() {
        return expect(this.render([[2, '.'], [1, '.'], [4, 'bar\n'], [0, 'foo\n'], [3, '.\n']])).toBe(this.html[3]);
      });
      it('unordered (59)', function() {
        return expect(this.render([[2, '.'], [1, '.'], [4, 'bar\n'], [3, '.\n'], [0, 'foo\n']])).toBe(this.html[3]);
      });
      it('unordered (60)', function() {
        return expect(this.render([[2, '.'], [3, '.\n'], [0, 'foo\n'], [1, '.'], [4, 'bar\n']])).toBe(this.html[2]);
      });
      it('unordered (61)', function() {
        return expect(this.render([[2, '.'], [3, '.\n'], [0, 'foo\n'], [4, 'bar\n'], [1, '.']])).toBe(this.html[2]);
      });
      it('unordered (62)', function() {
        return expect(this.render([[2, '.'], [3, '.\n'], [1, '.'], [0, 'foo\n'], [4, 'bar\n']])).toBe(this.html[2]);
      });
      it('unordered (63)', function() {
        return expect(this.render([[2, '.'], [3, '.\n'], [1, '.'], [4, 'bar\n'], [0, 'foo\n']])).toBe(this.html[2]);
      });
      it('unordered (64)', function() {
        return expect(this.render([[2, '.'], [3, '.\n'], [4, 'bar\n'], [0, 'foo\n'], [1, '.']])).toBe(this.html[2]);
      });
      it('unordered (65)', function() {
        return expect(this.render([[2, '.'], [3, '.\n'], [4, 'bar\n'], [1, '.'], [0, 'foo\n']])).toBe(this.html[2]);
      });
      it('unordered (66)', function() {
        return expect(this.render([[2, '.'], [4, 'bar\n'], [0, 'foo\n'], [1, '.'], [3, '.\n']])).toBe(this.html[3]);
      });
      it('unordered (67)', function() {
        return expect(this.render([[2, '.'], [4, 'bar\n'], [0, 'foo\n'], [3, '.\n'], [1, '.']])).toBe(this.html[3]);
      });
      it('unordered (68)', function() {
        return expect(this.render([[2, '.'], [4, 'bar\n'], [1, '.'], [0, 'foo\n'], [3, '.\n']])).toBe(this.html[3]);
      });
      it('unordered (69)', function() {
        return expect(this.render([[2, '.'], [4, 'bar\n'], [1, '.'], [3, '.\n'], [0, 'foo\n']])).toBe(this.html[3]);
      });
      it('unordered (71)', function() {
        return expect(this.render([[2, '.'], [4, 'bar\n'], [3, '.\n'], [0, 'foo\n'], [1, '.']])).toBe(this.html[3]);
      });
      it('unordered (72)', function() {
        return expect(this.render([[2, '.'], [4, 'bar\n'], [3, '.\n'], [1, '.'], [0, 'foo\n']])).toBe(this.html[3]);
      });
      it('unordered (73)', function() {
        return expect(this.render([[3, '.\n'], [0, 'foo\n'], [1, '.'], [2, '.'], [4, 'bar\n']])).toBe(this.html[3]);
      });
      it('unordered (74)', function() {
        return expect(this.render([[3, '.\n'], [0, 'foo\n'], [1, '.'], [4, 'bar\n'], [2, '.']])).toBe(this.html[3]);
      });
      it('unordered (75)', function() {
        return expect(this.render([[3, '.\n'], [0, 'foo\n'], [2, '.'], [1, '.'], [4, 'bar\n']])).toBe(this.html[3]);
      });
      it('unordered (76)', function() {
        return expect(this.render([[3, '.\n'], [0, 'foo\n'], [2, '.'], [4, 'bar\n'], [1, '.']])).toBe(this.html[3]);
      });
      it('unordered (77)', function() {
        return expect(this.render([[3, '.\n'], [0, 'foo\n'], [4, 'bar\n'], [1, '.'], [2, '.']])).toBe(this.html[3]);
      });
      it('unordered (78)', function() {
        return expect(this.render([[3, '.\n'], [0, 'foo\n'], [4, 'bar\n'], [2, '.'], [1, '.']])).toBe(this.html[3]);
      });
      it('unordered (79)', function() {
        return expect(this.render([[3, '.\n'], [1, '.'], [0, 'foo\n'], [2, '.'], [4, 'bar\n']])).toBe(this.html[3]);
      });
      it('unordered (80)', function() {
        return expect(this.render([[3, '.\n'], [1, '.'], [0, 'foo\n'], [4, 'bar\n'], [2, '.']])).toBe(this.html[3]);
      });
      it('unordered (81)', function() {
        return expect(this.render([[3, '.\n'], [1, '.'], [2, '.'], [0, 'foo\n'], [4, 'bar\n']])).toBe(this.html[3]);
      });
      it('unordered (82)', function() {
        return expect(this.render([[3, '.\n'], [1, '.'], [2, '.'], [4, 'bar\n'], [0, 'foo\n']])).toBe(this.html[3]);
      });
      it('unordered (83)', function() {
        return expect(this.render([[3, '.\n'], [1, '.'], [4, 'bar\n'], [0, 'foo\n'], [2, '.']])).toBe(this.html[3]);
      });
      it('unordered (84)', function() {
        return expect(this.render([[3, '.\n'], [1, '.'], [4, 'bar\n'], [2, '.'], [0, 'foo\n']])).toBe(this.html[3]);
      });
      it('unordered (85)', function() {
        return expect(this.render([[3, '.\n'], [2, '.'], [0, 'foo\n'], [1, '.'], [4, 'bar\n']])).toBe(this.html[3]);
      });
      it('unordered (86)', function() {
        return expect(this.render([[3, '.\n'], [2, '.'], [0, 'foo\n'], [4, 'bar\n'], [1, '.']])).toBe(this.html[3]);
      });
      it('unordered (87)', function() {
        return expect(this.render([[3, '.\n'], [2, '.'], [1, '.'], [0, 'foo\n'], [4, 'bar\n']])).toBe(this.html[3]);
      });
      it('unordered (88)', function() {
        return expect(this.render([[3, '.\n'], [2, '.'], [1, '.'], [4, 'bar\n'], [0, 'foo\n']])).toBe(this.html[3]);
      });
      it('unordered (89)', function() {
        return expect(this.render([[3, '.\n'], [2, '.'], [4, 'bar\n'], [0, 'foo\n'], [1, '.']])).toBe(this.html[3]);
      });
      it('unordered (90)', function() {
        return expect(this.render([[3, '.\n'], [2, '.'], [4, 'bar\n'], [1, '.'], [0, 'foo\n']])).toBe(this.html[3]);
      });
      it('unordered (91)', function() {
        return expect(this.render([[3, '.\n'], [4, 'bar\n'], [0, 'foo\n'], [1, '.'], [2, '.']])).toBe(this.html[3]);
      });
      it('unordered (92)', function() {
        return expect(this.render([[3, '.\n'], [4, 'bar\n'], [0, 'foo\n'], [2, '.'], [1, '.']])).toBe(this.html[3]);
      });
      it('unordered (92)', function() {
        return expect(this.render([[3, '.\n'], [4, 'bar\n'], [1, '.'], [0, 'foo\n'], [2, '.']])).toBe(this.html[3]);
      });
      it('unordered (93)', function() {
        return expect(this.render([[3, '.\n'], [4, 'bar\n'], [1, '.'], [2, '.'], [0, 'foo\n']])).toBe(this.html[3]);
      });
      it('unordered (94)', function() {
        return expect(this.render([[3, '.\n'], [4, 'bar\n'], [2, '.'], [0, 'foo\n'], [1, '.']])).toBe(this.html[3]);
      });
      it('unordered (95)', function() {
        return expect(this.render([[3, '.\n'], [4, 'bar\n'], [2, '.'], [1, '.'], [0, 'foo\n']])).toBe(this.html[3]);
      });
      it('unordered (96)', function() {
        return expect(this.render([[4, 'bar\n'], [0, 'foo\n'], [1, '.'], [2, '.'], [3, '.\n']])).toBe(this.html[3]);
      });
      it('unordered (97)', function() {
        return expect(this.render([[4, 'bar\n'], [0, 'foo\n'], [1, '.'], [3, '.\n'], [2, '.']])).toBe(this.html[3]);
      });
      it('unordered (98)', function() {
        return expect(this.render([[4, 'bar\n'], [0, 'foo\n'], [2, '.'], [1, '.'], [3, '.\n']])).toBe(this.html[3]);
      });
      it('unordered (99)', function() {
        return expect(this.render([[4, 'bar\n'], [0, 'foo\n'], [2, '.'], [3, '.\n'], [1, '.']])).toBe(this.html[3]);
      });
      it('unordered (100)', function() {
        return expect(this.render([[4, 'bar\n'], [0, 'foo\n'], [3, '.\n'], [1, '.'], [2, '.']])).toBe(this.html[3]);
      });
      it('unordered (101)', function() {
        return expect(this.render([[4, 'bar\n'], [0, 'foo\n'], [3, '.\n'], [2, '.'], [1, '.']])).toBe(this.html[3]);
      });
      it('unordered (102)', function() {
        return expect(this.render([[4, 'bar\n'], [1, '.'], [0, 'foo\n'], [2, '.'], [3, '.\n']])).toBe(this.html[3]);
      });
      it('unordered (103)', function() {
        return expect(this.render([[4, 'bar\n'], [1, '.'], [0, 'foo\n'], [3, '.\n'], [2, '.']])).toBe(this.html[3]);
      });
      it('unordered (104)', function() {
        return expect(this.render([[4, 'bar\n'], [1, '.'], [2, '.'], [0, 'foo\n'], [3, '.\n']])).toBe(this.html[3]);
      });
      it('unordered (105)', function() {
        return expect(this.render([[4, 'bar\n'], [1, '.'], [2, '.'], [3, '.\n'], [0, 'foo\n']])).toBe(this.html[3]);
      });
      it('unordered (106)', function() {
        return expect(this.render([[4, 'bar\n'], [1, '.'], [0, 'foo\n'], [3, '.\n'], [2, '.']])).toBe(this.html[3]);
      });
      it('unordered (107)', function() {
        return expect(this.render([[4, 'bar\n'], [1, '.'], [0, 'foo\n'], [2, '.'], [3, '.\n']])).toBe(this.html[1]);
      });
      it('unordered (108)', function() {
        return expect(this.render([[4, 'bar\n'], [2, '.'], [0, 'foo\n'], [1, '.'], [3, '.\n']])).toBe(this.html[3]);
      });
      it('unordered (109)', function() {
        return expect(this.render([[4, 'bar\n'], [2, '.'], [0, 'foo\n'], [3, '.\n'], [1, '.']])).toBe(this.html[3]);
      });
      it('unordered (110)', function() {
        return expect(this.render([[4, 'bar\n'], [2, '.'], [1, '.'], [0, 'foo\n'], [3, '.\n']])).toBe(this.html[3]);
      });
      it('unordered (111)', function() {
        return expect(this.render([[4, 'bar\n'], [2, '.'], [1, '.'], [3, '.\n'], [0, 'foo\n']])).toBe(this.html[2]);
      });
      it('unordered (112)', function() {
        return expect(this.render([[4, 'bar\n'], [2, '.'], [3, '.\n'], [0, 'foo\n'], [1, '.']])).toBe(this.html[2]);
      });
      it('unordered (113)', function() {
        return expect(this.render([[4, 'bar\n'], [2, '.'], [3, '.\n'], [1, '.'], [0, 'foo\n']])).toBe(this.html[2]);
      });
      it('unordered (114)', function() {
        return expect(this.render([[4, 'bar\n'], [3, '.\n'], [0, 'foo\n'], [1, '.'], [2, '.']])).toBe(this.html[3]);
      });
      it('unordered (115)', function() {
        return expect(this.render([[4, 'bar\n'], [3, '.\n'], [0, 'foo\n'], [2, '.'], [1, '.']])).toBe(this.html[3]);
      });
      it('unordered (116)', function() {
        return expect(this.render([[4, 'bar\n'], [3, '.\n'], [1, '.'], [0, 'foo\n'], [2, '.']])).toBe(this.html[3]);
      });
      it('unordered (117)', function() {
        return expect(this.render([[4, 'bar\n'], [3, '.\n'], [1, '.'], [2, '.'], [0, 'foo\n']])).toBe(this.html[3]);
      });
      it('unordered (118)', function() {
        return expect(this.render([[4, 'bar\n'], [3, '.\n'], [2, '.'], [0, 'foo\n'], [1, '.']])).toBe(this.html[3]);
      });
      return it('unordered (119)', function() {
        return expect(this.render([[4, 'bar\n'], [3, '.\n'], [2, '.'], [1, '.'], [0, 'foo\n']])).toBe(this.html[3]);
      });
    });
  });

}).call(this);
