package org.java.controller;

import org.java.service.LagouService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @Author 秒度
 * 
 * @Date 2019/7/20 0020 18:36
 */
@RestController
@EnableAsync
public class LagouController {
    @Autowired
    private LagouService lagouService;

    @GetMapping(value = {"findAll"})
    public Map<String, Object> findAll(Integer page, Integer limit) {
        Map<String, Object> map = new HashMap<>(16);
        int start = (page - 1) * limit;
        map.put("start", start);
        map.put("rows", limit);
        final List<Map<String, Object>> list = lagouService.findAll(map);
        final int count = lagouService.findCount();
        map.put("code", 0);
        map.put("msg", "");
        map.put("count", count);
        map.put("data", list);
        return map;
    }

    @RequestMapping(value = {"pie"})
    public Map<String, Object> pie() {
        Map<String, Object> m = new HashMap<>();//封装返回的数据
        //查询数据库，得到2维数组
        List<Map<String, Object>> list = lagouService.findPie();//2维数组，用于显示饼图的数据
        //创建一个List集合存放所有的标题
        List<Object> titles = new ArrayList<>(); //1维数组，所有的标题
        for (Map<String, Object> map : list) {
            Object people = map.get("people");
            titles.add(people);
        }
        //把2维数组，以及1维数组，都存放到m中，一起返回
        m.put("titles", titles);
        m.put("vals", list);
        return m;
    }
}
